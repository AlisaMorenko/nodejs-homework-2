const { NotFound, BadRequest } = require('http-errors');
const { Contact, joiSchemaStatus, joiSchema } = require('../model/contacts');

const getAllContacts = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.find({ owner: _id });
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

const getById = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const contact = await Contact.findOne({ _id: id, owner: user._id });
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

  const { user } = req;
  const newContact = { ...req.body, owner: user._id };
  const result = await Contact.create(newContact);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

const remove = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const contact = await Contact.findOneAndRemove({ _id: id, owner: user._id });
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
  const { user } = req;
  const { error } = joiSchema.validate(req.body);
  if (error) {
    throw new BadRequest(`Missing fields`);
  }
  const { id } = req.params;
  const contact = await Contact.findOneAndUpdate(
    { _id: id, owner: user._id },
    req.body,
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

const updateStatusContact = async (req, res) => {
  const { user } = req;
  const { error } = joiSchemaStatus.validate(req.body);
  if (error) {
    throw new BadRequest(`Missing field favorite`);
  }
  const { id } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findOneAndUpdate(
    { _id: id, owner: user._id },
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
