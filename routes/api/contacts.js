const express = require('express');
const router = express.Router();
const controllerWrapper = require('../../middlewares/controllerWrapper.js');
const authenticate = require('../../middlewares/authenticate');

const cntrl = require('../../controllers/contacts');

router.get('/', authenticate, controllerWrapper(cntrl.getAllContacts));

router.get('/:id', authenticate, controllerWrapper(cntrl.getById));

router.post('/', authenticate, controllerWrapper(cntrl.add));

router.delete('/:id', authenticate, controllerWrapper(cntrl.remove));

router.put('/:id', authenticate, controllerWrapper(cntrl.update));

router.patch(
  '/:id/favorite',
  authenticate,
  controllerWrapper(cntrl.updateStatusContact),
);

module.exports = router;
