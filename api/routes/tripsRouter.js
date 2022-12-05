const express = require("express");
const router = express.Router();
const tripController = require('../controller/tripController');

router.get('/',tripController.all);
router.get('/:id',tripController.getForId);
router.post('/',tripController.create);
// TO DO DELETE AND PATCH

module.exports = router;

