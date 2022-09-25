export interface INotifications {
  list: INotificationItem[]
  load: boolean
  showVirtualPagination: boolean
  unread: number
}

export interface INotificationItem {
  createdAt: Date
  id: number
  image: string
  new?: boolean
  read: boolean
  teamName: string
}

export interface INotificationList {
  items: INotificationItem[]
  timestamp: number
}
