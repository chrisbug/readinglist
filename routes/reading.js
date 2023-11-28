const path = require('path');

const express = require('express');

const readingController = require('../controllers/reading');

const router = express.Router();

router.get('/list', readingController.getReading);

router.post('/list', readingController.postReading);

router.get('/clear', readingController.getClear);

router.post('/update-status', readingController.postStatus);

router.post('/delete-item', readingController.postReadingDeleteBook);

router.get('/favorite-genre', readingController.buildFavoriteBarChart);

router.get('/favorite-data', readingController.getFavoriteData);




module.exports = router;
