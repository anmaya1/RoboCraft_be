const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'anmayademo@gmail.com',
    pass: 'pvqqpvtfarvdatxf',
  },
});

module.exports = transporter