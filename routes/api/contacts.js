const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { NotFound, BadRequest } = require('http-errors');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index');

const schema = Joi.object({
  name: Joi.string().min(1).required(),
  phone: Joi.string().min(5).required(),
  email: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      throw new NotFound(`Not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequest(`Missing required name field`);
    }
    const result = await addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
    console.log(req.body);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await removeContact(id);

    if (!contact) {
      throw new NotFound(`Not found`);
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequest(`Missing fields`);
    }
    const { id } = req.params;
    const contact = await updateContact(id, req.body);
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
  } catch (error) {
    next(error);
  }
});

module.exports = router;
