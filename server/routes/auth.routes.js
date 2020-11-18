const express = require("express");
const router = express.Router();
const registrarionController = require('../controllers/auth.controller');
const authController = require('../controllers/auth.controller');
const { check } = require('express-validator')

router.post('/register', 
[
    check('email', 'Error email').isEmail(),
    check('password', 'Error password').isLength({ min: 3 }),
    check('login', 'Error login').isLength({ min: 2 }),
    check('city', 'Error city').isLength({ min: 2 }),
    check('name', 'Error name').isLength({ min: 2 }),
], 
registrarionController.addUser);

router.post('/edit', 
[
    check('email', 'Error email').isEmail(),
    check('login', 'Error login').isLength({ min: 2 }),
    check('city', 'Error city').isLength({ min: 2 }),
    check('name', 'Error name').isLength({ min: 2 }),
], 
authController.editUser);

router.post('/change', authController.changeUser);
router.post('/confirmation', registrarionController.confirmationUser);
router.post('/login', authController.loginUser);

module.exports = router;