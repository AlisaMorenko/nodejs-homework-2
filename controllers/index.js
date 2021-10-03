const { NotFound, BadRequest } = require('http-errors');
const { object } = require('joi');
const { isValidObjectId } = require('mongoose');
const { Contact, joiSchemaStatus, joiSchema } = require('../model/index');

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findOne({ _id: id });
  if (!contact) {
    throw new NotFound(`Not found`);
  }
  res.json(contact);
};

const add = async (req, res) => {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    throw new BadRequest(`Missing required name field`);
  }
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
  console.log(req.body);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndRemove({ _id: id });
  if (!contact) {
    throw new NotFound(`Not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
    data: { contact },
  });
};

const update = async (req, res) => {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    throw new BadRequest(`Missing fields`);
  }
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!contact) {
    throw new NotFound(`Not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact updated',
    data: {
      contact,
    },
  });
};

const updateStatusContact = async (req, res) => {
  const { error } = joiSchemaStatus.validate(req.body);
  if (error) {
    throw new BadRequest(`Missing field favorite`);
  }
  const { id } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    { _id: id },
    { favorite },
    {
      new: true,
    },
  );
  if (!contact) {
    throw new NotFound(`Not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact updated',
    data: {
      contact,
    },
  });
};

module.exports = {
  getAllContacts,
  getById,
  remove,
  add,
  update,
  updateStatusContact,
};
