const express = require("express");
const router = express.Router();

const usersController = require('../controllers/users.controllers');

router.get('/get', usersController.getUsers);
router.post('/getone', usersController.getUser);
router.delete('/delete', usersController.deleteUser);
router.post('/block', usersController.blockUser);
router.post('/admin', usersController.adminUser);

module.exports = router;

