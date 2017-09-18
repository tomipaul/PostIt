import nodemailer from 'nodemailer';
import axios from 'axios';
import fs from 'fs';

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
   * read from html template and replace placeholders
   * @method readFromTemplate
   * @param {string} dir file path of html template
   * @param {object} options values of placeholders
   * @return {Promise} rejects on failure, resolves on success
   */
  static readFromTemplate({ dir, options }) {
    return new Promise((resolve, reject) => {
      return fs.readFile(dir, 'utf8', (err, data) => {
        if (err) reject(err);
        const regex = /{{(\w+)}}/gi;
        resolve(data.replace(regex, (match, p) => {
          return options[p];
        }));
      });
    });
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
  /**
   * send reset password mail to user
   * @method sendResetPasswordMail
   * @memberof NotificationService
   * @param {object} options recipient info and action url
   * @returns {void}
   */
  sendResetPasswordMail(options) {
    return NotificationService.readFromTemplate({
      dir: 'server/services/mailTemplates/resetPassword.html',
      options
    })
    .then((message) => {
      const mailOptions = NotificationService.setMailOptions({
        recipient: options,
        messageBody: message,
        subject: 'Set up a new password for PostIt account'
      });
      return this.mailTransporter.sendMail(mailOptions)
      .then(() => {
        return 'Message sent successfully';
      });
    })
    .catch((error) => {
      throw error;
    });
  }
}

export default NotificationService;
