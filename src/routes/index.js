const express = require('express');
const router = express.Router();

// Helpers
const { isAuthenticated } = require('../helpers/auth');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/desafios', isAuthenticated, (req, res) => {
    res.render('desafios');
});

module.exports = router;