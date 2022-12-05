const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

router.get('/',userController.all);
router.get('/:id', userController.getForId);
router.patch('/reserve/:id',userController.reserve);
router.patch('/cancelReserve/:id',userController.cancelReserve);
router.get('/returnToken/:id',userController.returnToken);
router.get('/mytravels/:id',userController.userArea);
router.post('/register', userController.register);
router.post('/login',userController.login);
router.post('/emailexists',userController.compareEmail);
router.post('/cpfexists',userController.compareCPF);

module.exports = router;