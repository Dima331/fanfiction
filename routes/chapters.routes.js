const express = require("express");
const router = express.Router();

const chaptersController = require('../controllers/chapters.controllers');

router.get('/get/:id', chaptersController.getChapters);
router.get('/edit/:id', chaptersController.editChapter);

router.post('/add', chaptersController.addChapters);
router.post('/getview', chaptersController.getViewChapter);
router.post('/sort', chaptersController.sortChapter);
router.post('/change', chaptersController.changeChapter);
router.post('/getnav', chaptersController.getNavChapter);
router.post('/likes', chaptersController.likesChapter);

router.delete('/delete', chaptersController.deleteChapter);

module.exports = router;

