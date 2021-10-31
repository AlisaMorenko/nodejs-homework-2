const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true },
);

const joiSchema = Joi.object({
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: Joi.string()
    .pattern(
      new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ),
    )
    .required(),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const User = model('user', userSchema);
module.exports = {
  User,
  joiSchema,
};
