const express = require("express");
const router = express.Router();

const genresController = require('../controllers/genres.controllers');

router.get('/', genresController.getGenres);

module.exports = router;

