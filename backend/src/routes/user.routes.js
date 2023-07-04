const { loginUser, signUpUser } = require('../controllers/user.controller');

const express = require('express');
const router = express.Router();


//log in routes
router.post('/login', loginUser)

//sign up routes
router.post('/signup', signUpUser)


module.exports = router;