const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/users/signup', userController.postSignUpUser);
router.post('/users/signin', userController.postLogInUser);

module.exports = router;
