import { INotificationItem, INotifications } from '@/interfaces/notifications';

export const initialState: () => INotifications = () => ({
  list: [],
  load: true,
  showVirtualPagination: true,
  unread: 0
});

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    setNewNotification(
      state: INotifications,
      payload: INotificationItem
    ): void {
      state.list.unshift(payload);
    },
    setOldNotifications(
      state: INotifications,
      payload: INotificationItem[]
    ): void {
      state.list.push(...payload);
    },
    setLoad(state: INotifications, payload: boolean): void {
      state.load = payload;
    },
    setShowVirtualPagination(state: INotifications, payload: boolean): void {
      state.showVirtualPagination = payload;
    },
    setUnread(state: INotifications, payload: number): void {
      state.unread = payload;
    },
    setReadNotification(state: INotifications, payload: number): void {
      state.list = state.list.map((n) => ({
        ...n,
        read: n.id === payload ? true : n.read
      }));
    },
    reset(state: INotifications): void {
      state.list = [];
      state.load = true;
      state.showVirtualPagination = true;
    }
  },
  getters: {
    notifications(state: INotifications): INotificationItem[] {
      return state.list;
    },
    load(state: INotifications): boolean {
      return state.load;
    },
    showVirtualPagination(state: INotifications): boolean {
      return state.showVirtualPagination;
    },
    unread(state: INotifications): number {
      return state.unread;
    }
  }
};
