// middleware/resetTokenValidator.js
const { ResetToken } = require('../models');

async function resetTokenValidator(req, res, next) {
  const { token } = req.params;
  // const { token } = req.body;
console.log(token)
  try {
    const resetToken = await ResetToken.model.findOne({
      where: { token },
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    req.resetToken = resetToken;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = resetTokenValidator;
