import NotificationService from '../services/NotificationService.js';

const Notification = new NotificationService();
/**
 * send notifications to users based on message priority levels
 * @function sendNotifications
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next
 * @returns {void}
 */
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
