//utils unReadNotification.js
export const unreadNotificationsFunc = (notifications) => {
    let filetredNotification = notifications.filter((n) => n.isRead === false);
    return filetredNotification;
}