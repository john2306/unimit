const express = require('express');
const router = express.Router();

// Models
const Contact = require('../models/Contact');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// Routes Sigle Page Application
router.get('/competitions/theme1/', isAuthenticated , (req, res) => {
  res.render('competitions/competencia');
});

router.get('/competitions/theme1/general', isAuthenticated , (req, res) => {
  res.render('competitions/competencia');
});

router.get('/competitions/theme1/information', isAuthenticated , (req, res) => {
  res.render('competitions/information');
});

router.get('/competitions/theme1/discusion', isAuthenticated , (req, res) => {
  res.render('competitions/discusion');
});

router.get('/competitions/theme1/rules', isAuthenticated , (req, res) => {
  res.render('competitions/rules');
});

router.get('/competitions/theme1/general/description', isAuthenticated , (req, res) => {
  res.render('competitions/general/description');
});

router.get('/competitions/theme1/general/evaluation', isAuthenticated , (req, res) => {
  res.render('competitions/general/evaluation');
});

router.get('/competitions/theme1/general/prizes', isAuthenticated , (req, res) => {
  res.render('competitions/general/prizes');
});

router.get('/competitions/theme1/general/honorCode', isAuthenticated , (req, res) => {
  res.render('competitions/general/honorCode');
});

router.get('/competitions/theme1/general/timeline', isAuthenticated , (req, res) => {
  res.render('competitions/general/timeline');
});

router.get('/competitions/theme1/general/submission', isAuthenticated , (req, res) => {
  res.render('competitions/general/submission');
});


module.exports = router;