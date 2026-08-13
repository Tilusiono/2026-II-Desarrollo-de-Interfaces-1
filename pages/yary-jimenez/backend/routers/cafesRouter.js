const express = require('express');
const router = express.Router();
const { getCafes, createCafe } = require('../controllers/cafecontrollers');

router.get('/', getCafes);
router.post('/', createCafe);

module.exports = router;