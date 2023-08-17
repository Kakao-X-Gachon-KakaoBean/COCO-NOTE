export interface NotificationItem {
  projectName?: string;
  notificationId: number;
  createdAt: string;
  content: string;
  url: string;
  hasRead: boolean;
}
