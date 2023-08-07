require("dotenv").config();
const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const transporter = require('../nodeMailer');
const { ResetToken } = require('../models');
const { users } = require('../models'); // Ensure correct path
const resetTokenValidator = require('../middlewares/rest');
const bcrypt = require("bcrypt");


const router = express.Router();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
// });
router.post('/forgotPassword', async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by their email using the DataCollection object
    const user = await users.model.findOne({ where: { email: email } });

    if (user) {
      const token = crypto.randomBytes(20).toString('hex');
      const expirationDate = new Date(Date.now() + 3600000);

      const resetToken = await ResetToken.create({
        token: crypto.createHash('sha256').update(token).digest('hex'),
        expiresAt: expirationDate,
        user_id: user.id,
      });

      await transporter.sendMail({
        from: 'apihoteltest@gmail.com',
        to: user.email,
        subject: 'Reset Your Password',
        text: `Click the following link to reset your password: ${resetToken.token}`,
      });

      res.json({ message: 'Password reset email sent' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/resetPassword/:token', resetTokenValidator, async (req, res) => {
  const { newPassword } = req.body;
  const { resetToken } = req;
  const { email } = req.body;

  // Find the user by their email using the DataCollection object
  const theuser = await users.model.findOne({ where: { email: email } });
  
  // console.log(resetToken)
  console.log("modelllllllll",users.model)

  try {
    const user = await users.model.findByPk(theuser.user_id);

    if (user) {
      // Update user's password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      // Delete the used reset token
      await resetToken.destroy();

      res.json({ message: 'Password reset successful' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }})

  router.get('/rest/:token', resetTokenValidator, async (req, res, next) => {
    console.log("Token received in route: ", req.params.token); // Add this line
    // Rest of the route code
  });
module.exports = router;