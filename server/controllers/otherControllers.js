import NotificationService from '../services/NotificationService.js';

const Notification = new NotificationService();

export const sendNotifications = (req, res, next) => {
  req.group.getUsers()
  .then((users) => {
    users.forEach((user) => {
      const messsagePriority = req.res.data.createdMessage.priority;
      if (messsagePriority === 'urgent') {
        Notification.sendMailNotification(user, req.group);
      } else if (messsagePriority === 'critical') {
        Notification.sendMailNotification(user, req.group);
        Notification.sendSMSNotification(user, req.group);
      }
    });
    return next();
  })
  .catch((err) => {
    next(err);
  });
};
