import NotificationService from '../services/NotificationService.js';

const Notification = new NotificationService();

const sendNotifications = (req, res, next) => {
  const createdMessage = req.res.data.createdMessage;
  req.group.getUsers({
    where: {
      id: { ne: createdMessage.AuthorId }
    }
  })
  .then((users) => {
    users.forEach((user) => {
      const messsagePriority = createdMessage.priority;
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

export default sendNotifications;
