const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/desafios', (req, res) => {
  res.render('desafios');
});

module.exports = router;
