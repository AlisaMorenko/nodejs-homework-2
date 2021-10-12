const express = require('express');
const router = express.Router();
const controllerWrapper = require('../../middlewares/controllerWrapper.js');

const cntrl = require('../../controllers/index');

router.get('/', controllerWrapper(cntrl.getAllContacts));

router.get('/:id', controllerWrapper(cntrl.getById));

router.post('/', controllerWrapper(cntrl.add));

router.delete('/:id', controllerWrapper(cntrl.remove));

router.put('/:id', controllerWrapper(cntrl.update));

router.patch('/:id/favorite', controllerWrapper(cntrl.updateStatusContact));

module.exports = router;
