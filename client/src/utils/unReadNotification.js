//utils unReadNotification.js
export const unreadNotificationsFunc = (notifications) => {
    let filetredNotification = notifications.filter((n) => n.isRead === false);
    console.log("filetredNotification", filetredNotification);
    return filetredNotification;
}