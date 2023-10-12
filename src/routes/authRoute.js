"use strict";

const express = require("express");
const authRouter = express.Router();
const transporter = require("../nodeMailer");
require("dotenv").config();
const crypto = require("crypto");

const model = require("../models/index");

const { users } = require("../models");
const basicAuth = require("../auth/basic.js");
const bearerAuth = require("../auth/bearer.js");
const permissions = require("../auth/acl.js");

authRouter.post("/signup", async (req, res, next) => {
  try {
    const userRecord = await users.create(req.body);

    // Generate a verification token
    const token = crypto.randomBytes(20).toString("hex"); // GenFerate a random string
    const verificationToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex"); // Hash the token using SHA-256
    const expirationDate = new Date(Date.now() + 3600000); // Set the expiration date (1 hour from now)

    // Update user record with the verification token
    userRecord.verificationToken = verificationToken;
    userRecord.expiresAt = expirationDate;
    await userRecord.save();

    // Compose the verification email
    const verificationLink = `http://localhost:8000/verify?token=${verificationToken}`;
    const mailOptions = {
      from: process.env.EMAIL,
      to: userRecord.email,
      subject: "Email Verification",
      html: `Click <a href="${verificationLink}">here</a> to verify your email.`,
    };

    // Send the verification email
    await transporter.sendMail(mailOptions);

    const output = {
      message: "User created. Please check your email for verification.",
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});
authRouter.get("/dirtyrooms", handeldirty);

async function handeldirty(req, res, next) {
  try {
    const records = await model.rooms.dirty();
    res.status(200).json(records);
  } catch (err) {
    next(err);
  }
}
authRouter.get("/verify", async (req, res, next) => {
  try {
    const token = req.query.token;

    // Find the user by the verification token
    const userRecord = await users.model.findOne({
      where: { verificationToken: token },
    });

    if (!userRecord) {
      return res.status(404).send("Invalid token");
    }

    // Mark the user's email as verified
    userRecord.emailVerified = true;
    userRecord.verificationToken = null; // Clear the token
    await userRecord.save();

    res.status(200).send("Email verified successfully.");
  } catch (e) {
    next(e.message);
  }
});

authRouter.post("/signin", basicAuth, async (req, res, next) => {
  try {
    const user = req.user; // User object from basicAuth middleware

    // Check if the user's email is verified
    if (!user.emailVerified) {
      return res.status(401).json({ message: "Email not verified yet." });
    }

    // Construct the user response object
    else {
      const userData = {
        user: {
          user_id: user.user_id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          username: user.username,
          role: user.role,
          updatedAt: user.updatedAt,
          createdAt: user.createdAt,
        },
        token: user.token,
      };

      res.status(200).json(userData);
    }
  } catch (e) {
    next(e.message);
  }
});

authRouter.get(
  "/users",
  bearerAuth,
  permissions("read"),
  async (req, res, next) => {
    try {
      const userRecords = await users.findAll();
      const userList = userRecords.map((user) => user.username);
      res.status(200).json(userList);
    } catch (e) {
      next(e.message);
    }
  }
);

authRouter.get("/secret", bearerAuth, async (req, res, next) => {
  res.status(200).send("Welcome to the secret area");
});

module.exports = authRouter;
