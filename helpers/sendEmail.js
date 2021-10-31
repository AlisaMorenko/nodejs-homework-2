const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const SENDGREED_KEY = process.env.SENDGREED_KEY;
sgMail.setApiKey(SENDGREED_KEY);

const sendEmail = async data => {
  const newEmail = { ...data, from: 'alisa.morenko@gmail.com' };
  try {
    await sgMail.send(newEmail);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
