const { Schema, model } = require('mongoose');
const Joi = require('joi');
const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

const joiSchema = Joi.object({
  name: Joi.string().min(1).required(),
  phone: Joi.string().min(5).required(),
  email: Joi.string().required(),
  favorite: Joi.boolean(),
});

const joiSchemaStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model('contact', contactSchema);
module.exports = {
  Contact,
  joiSchema,
  joiSchemaStatus,
};
