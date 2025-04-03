// config/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // ya koi aur service
  auth: {
    user: process.env.EMAIL_USER,     // .env me set karein
    pass: process.env.EMAIL_PASS      // .env me set karein
  }
});

module.exports = transporter;
