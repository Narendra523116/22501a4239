const express = require('express');
const router = express.Router();
const { createShortUrl, getStats } = require('../controllers/shorturlController');

router.post('/shorturls', createShortUrl);
router.get('/shorturls/:shortcode', getStats);

module.exports = router;
