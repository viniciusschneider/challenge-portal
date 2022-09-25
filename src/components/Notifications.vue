<template>
  <div
    class="scroll-container"
    ref="scrollContainer"
    :style="{
      background:
        $vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background
    }"
  >
    <v-timeline
      v-if="notifications.length > 0"
      class="list-container"
      ref="listContainer"
      align-top
      dense
    >
      <v-slide-x-reverse-transition group hide-on-leave>
        <v-timeline-item
          v-for="item in notifications"
          :key="item.id"
          :color="item.read ? 'blue' : 'grey'"
          :icon="item.read ? 'mdi-check' : ''"
          small
          class="mb-3 py-2"
          :class="{ accent: !!item.new }"
        >
          <v-row class="ma-0">
            <v-col class="pa-0 pe-3">
              <div class="d-flex flex-row align-start">
                <img class="me-2" :src="item.image" alt="Logo do time" />
                <div class="text-caption">
                  <p class="ma-0 mb-1"><strong>Partida agendada!</strong></p>
                  <p class="ma-0 ms-1">
                    Você tem uma nova partida agendada com o time
                    <strong>{{ item.teamName }}</strong
                    >!
                  </p>
                  <div
                    class="d-flex flex-row justify-space-between align-baseline"
                  >
                    <p class="ma-0 ms-1 mt-3">
                      <strong>{{
                        item.createdAt | date('DD/MM/YYYY HH:mm')
                      }}</strong>
                    </p>
                    <v-tooltip bottom>
                      <template
                        v-if="!item.read"
                        v-slot:activator="{ on, attrs }"
                      >
                        <v-btn
                          @click="read(item.id)"
                          color="primary"
                          icon
                          small
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>mdi-check</v-icon>
                        </v-btn>
                      </template>
                      <span>Marcar como lida</span>
                    </v-tooltip>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-slide-x-reverse-transition>
    </v-timeline>
    <p v-if="!load && notifications.length === 0" class="text-caption ma-3">
      Você ainda não possui nenhuma notificação!
    </p>
    <div
      v-show="!load && showVirtualPagination"
      class="sentinel"
      ref="sentinel"
    ></div>
    <p
      v-if="load && showVirtualPagination"
      class="my-2"
      style="text-align: center"
    >
      Carregando...
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { NotificationsModule } from '@/store/namespaces';
import { INotificationItem } from '@/interfaces/notifications';

@Component
export default class Notifications extends Vue {
  @NotificationsModule.Getter('load') load: boolean;
  @NotificationsModule.Getter('notifications')
  notifications: INotificationItem[];
  @NotificationsModule.Getter('showVirtualPagination')
  showVirtualPagination: boolean;
  @NotificationsModule.Mutation('setLoad') setLoad: (payload: boolean) => void;

  listEndObserver: IntersectionObserver;

  mounted(): void {
    const threshold = 0.5;
    this.listEndObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < threshold || !entry.isIntersecting)
          return;

        this.setLoad(true);
        this.$emit('load');
      },
      {
        root: this.$refs['scrollContainer'] as Element,
        threshold
      }
    );

    this.listEndObserver.observe(this.$refs['sentinel'] as Element);
  }

  destroyed(): void {
    this.listEndObserver.disconnect();
  }

  read(notificationId: number): void {
    this.$emit('read', notificationId);
  }
}
</script>
<style lang="scss" scoped>
.scroll-container {
  max-height: 80vh;
  min-width: 510px;
  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: 600px) {
    min-width: 80vw;
  }
}

.sentinel {
  height: 30px;
  width: 100%;
}

img {
  border-radius: 50%;
  height: 60px;
  object-fit: cover;
  width: 60px;
}
</style>
