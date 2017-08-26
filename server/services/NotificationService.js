import nodemailer from 'nodemailer';
import axios from 'axios';

/**
 * @class NotificationService
 */
class NotificationService {
  /**
   * @constructor
   * @memberof NotificationService
   */
  constructor() {
    this.mailTransporter = NotificationService.setUpTransporter();
    this.SMSApiKey = process.env.TEXTBELT_KEY;
  }
  /**
   * Set up the mail transporter
   * @method setUpTransporter
   * @memberof NotificationService
   * @static
   * @return {object} mail transporter
   */
  static setUpTransporter() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVICE_USER,
        pass: process.env.EMAIL_SERVICE_PASS
      }
    });
    return transporter;
  }
  /**
   * set mail text, subject and destination
   * @method setMailOptions
   * @memberof NotificationService
   * @static
   * @return {object} mail options
   */
  static setMailOptions({ recipient, messageBody, subject }) {
    return {
      subject,
      to: recipient.email,
      html: messageBody,
      from: '"Oluwatomi Akande 👻" <noreply.postit@gmail.com>'
    };
  }
  /**
   * send mail notification to members of a group
   * when a message is posted to the group
   * @method sendMailNotification
   * @memberof NotificationService
   * @param {object} recipient
   * @param {object} group
   * @return {promise} resolves with a message or rejects with an error
   */
  sendMailNotification(recipient, group) {
    const template = `<div>
    <h3>Hello ${recipient.username}</h3>
    <span>A message has been posted to ${group.name}</span>
    </div>`;
    const mailOptions = NotificationService.setMailOptions({
      recipient,
      messageBody: template,
      subject: 'Message notification @ app-postit.herokuapp.com'
    });
    this.mailTransporter.sendMail(mailOptions)
    .then(() => {
      return 'Message sent successfully';
    })
    .catch((error) => {
      throw error;
    });
  }
  /**
   * send SMS notification to members of a group
   * when a message is posted to the group
   * @method sendSMSlNotification
   * @memberof NotificationService
   * @param {object} recipient
   * @param {object} group
   * @return {promise} resolves with a message or rejects with an error
   */
  sendSMSNotification(recipient, group) {
    const message = `Hi ${recipient.username},\nA message has been posted to ${group.name}`;
    axios.post('https://textbelt.com/text', {
      phone: recipient.phoneNo,
      message,
      key: this.SMSApiKey
    })
    .then(() => {
      return 'Message sent successfully';
    })
    .catch((error) => {
      throw error;
    });
  }
}

export default NotificationService;
