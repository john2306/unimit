const express = require('express');
const router = express.Router();

// Helpers
const { isAuthenticated } = require('../helpers/auth');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/contact', isAuthenticated, (req, res) => {
  res.render('contact');
});

router.get('/desafios', (req, res) => {
  res.render('desafios');
});

module.exports = router;