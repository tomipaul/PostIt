import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVICE_USER,
    pass: process.env.EMAIL_SERVICE_PASS
  }
});

/**
 * @class emailService
 */
class emailService {
  /**
   * send mail to reset password
   * @method sendResetPasswordMail
   * @static
   * @memberof emailService
   * @param {string} recipient
   * @param {string} message
   * @return {promise} resolves with a message or rejects with an error
   */
  static sendResetPasswordMail(recipient) {
    const mailOptions = {
      from: '"Oluwatomi Akande 👻" <noreply.postit@gmail.com>',
      to: recipient,
      subject: 'Reset password @ app-postit.herokuapp.com',
      text: '',
      html: `<b>Hello world ?</b>
      `
    };
    return transporter.sendMail(mailOptions)
    .then(() => {
      return 'Message sent successfully';
    })
    .catch((error) => {
      throw error;
    });
  }
}

export default emailService;
