<template>
  <v-app-bar app clipped-left>
    <div style="width: 100%" class="d-flex justify-space-between">
      <v-app-bar-nav-icon @click="setDrawer(!drawer)"></v-app-bar-nav-icon>
      <div class="d-flex flex-row">
        <v-menu
          bottom
          offset-y
          right
          transition="slide-x-transition"
          v-model="showNotifications"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <div class="notifications">
              <div v-if="unread" class="count error">
                <span>{{ unread > 99 ? '+99' : unread }}</span>
              </div>
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="primary"
                @click="resetNotifications"
              >
                <v-icon>mdi-bell-outline</v-icon>
              </v-btn>
            </div>
          </template>
          <Notifications
            @load="paginateNotifications"
            @read="readNotification"
          />
        </v-menu>
        <v-menu bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" color="primary">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <div class="py-2 px-3 rounded menu-item" v-ripple @click="logout">
                Sair
              </div>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { NotificationsModule, UiModule, UserModule } from '@/store/namespaces';
import Vue from 'vue';
import { io, Socket } from 'socket.io-client';
import { IAccessToken } from '@/interfaces/access-token.interface';
import Notifications from '@/components/Notifications.vue';
import {
  INotificationItem,
  INotificationList
} from '@/interfaces/notifications';
import { environment } from '@/environments/environment';
import { INotificationsParams } from '@/interfaces/notifications-params.interface';
import { EnumRouteNames } from '@/router';

@Component({ components: { Notifications } })
export default class AppBar extends Vue {
  @NotificationsModule.Getter('notifications')
  notifications: INotificationItem[];
  @NotificationsModule.Getter('unread') unread: number;
  @NotificationsModule.Mutation('reset') reset: () => void;
  @NotificationsModule.Mutation('setLoad') setLoad: (payload: boolean) => void;
  @NotificationsModule.Mutation('setNewNotification') setNewNotification: (
    payload: INotificationItem
  ) => void;
  @NotificationsModule.Mutation('setOldNotifications') setOldNotifications: (
    payload: INotificationItem[]
  ) => void;
  @NotificationsModule.Mutation('setReadNotification') setReadNotification: (
    payload: number
  ) => void;
  @NotificationsModule.Mutation('setShowVirtualPagination')
  setShowVirtualPagination: (payload: boolean) => void;
  @NotificationsModule.Mutation('setUnread') setUnread: (
    payload: number
  ) => void;
  @UiModule.Getter('getDrawer') drawer: boolean;
  @UiModule.Mutation('setDrawer') setDrawer: (payload: boolean) => void;
  @UserModule.Getter('getAccessToken') accessToken: IAccessToken;

  pagination: INotificationsParams = {
    limit: 10,
    page: 0,
    timestamp: Date.now()
  };
  showNotifications = false;
  socket: Socket;

  mounted(): void {
    this.socket = io(`${environment.apiUrl}notifications`, {
      extraHeaders: {
        Authorization: `Bearer ${this.accessToken.token}`
      },
      autoConnect: false
    }).connect();

    this.socket.on('new', (data: INotificationItem) => {
      if (new Date(data.createdAt).getTime() <= this.pagination.timestamp)
        return;
      this.setNewNotification({ ...data, new: true });
    });

    this.socket.on('unread-totalizer', (data: number) => {
      this.setUnread(data);
    });

    this.socket.on('read-notification', (notificationId: number) => {
      this.setReadNotification(notificationId);
    });

    this.socket.emit('find-unread-totalizer', (data: number) => {
      this.setUnread(data);
    });

    this.socket.onAny((data, d) => {
      console.log('any', data, d);
    });
  }

  destroyed(): void {
    this.socket.disconnect();
  }

  paginateNotifications(): void {
    this.pagination.page++;
    this.setLoad(true);
    this.socket.emit(
      'list-old',
      this.pagination,
      ({ items, timestamp }: INotificationList) => {
        if (!(timestamp === this.pagination.timestamp)) return;

        this.setLoad(false);
        if (items.length > 0) {
          this.setOldNotifications(items);
        } else {
          this.setShowVirtualPagination(false);
        }
      }
    );
  }

  resetNotifications(): void {
    if (this.showNotifications) return;

    this.reset();
    this.pagination.timestamp = Date.now();
    this.pagination.page = 0;
    this.paginateNotifications();
  }

  readNotification(notificationId: number): void {
    this.setReadNotification(notificationId);
    this.socket.emit('read-notification', { notificationId });
  }

  logout(): void {
    this.$store.commit('reset');
    this.$router.push({ name: EnumRouteNames.LOGIN });
  }
}
</script>
<style scoped lang="scss">
.menu-item:hover {
  cursor: pointer;
}

.notifications {
  position: relative;

  .count {
    align-items: center;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    left: 29px;
    padding: 2px 6px;
    position: absolute;
    top: 0px;
    span {
      color: white;
      font-size: 12px;
      font-weight: bold;
    }
  }
}
</style>
