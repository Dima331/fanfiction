const express = require("express");
const router = express.Router();

const fanfictionsController = require('../controllers/fanfictions.controllers');

router.get('/view', fanfictionsController.getFanfictions);
router.get('/view/:id', fanfictionsController.getFanfiction);
router.get('/edit/:id', fanfictionsController.editFanfictions);

router.post('/add', fanfictionsController.addFanfictions);
router.post('/change', fanfictionsController.changeFanfictions);

router.delete('/delete', fanfictionsController.deleteFanfictions);


module.exports = router;

