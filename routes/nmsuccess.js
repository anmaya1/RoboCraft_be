const express= require('express');
const router=express.Router();
const transporter = require('../config/nm')

router.post('/success', async (req, res) => {
    try {
      // Your registration logic here...
      // For example, saving user details to the database.
  
      // After successful registration, send an email to the user
      const mailOptions = {
        from: 'anmayademo@gmail.com', // Sender address
        to: 'rockingsudeep08@gmail.com', // Receiver address (user's email)
        subject: 'Registration Successful',
        text: 'Congratulations! Your registration was successful.',
      };
  
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  
      res.status(200).json({ message: 'Registration successful!' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Registration failed.' });
    }
  });
  module.exports = router;