const express = require("express");
const router = express.Router();

const tagsController = require('../controllers/tags.controllers');

router.get('/', tagsController.getTags);

module.exports = router;

