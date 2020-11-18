const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth.middleware')

const fanfictionsController = require('../controllers/fanfictions.controllers');

router.get('/view', fanfictionsController.getFanfictions);
router.get('/view/:id', fanfictionsController.getFanfiction);
router.get('/comments/:id', fanfictionsController.commentsFanfiction);

router.post('/add', auth, fanfictionsController.addFanfictions);
router.post('/user', fanfictionsController.userFanfictions);
router.post('/rating', fanfictionsController.ratingFanfiction);
router.post('/edit/:id', fanfictionsController.editFanfictions);
router.post('/change', fanfictionsController.changeFanfictions);

router.delete('/delete', fanfictionsController.deleteFanfictions);

module.exports = router;

