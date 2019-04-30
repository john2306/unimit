const express = require('express');
const router = express.Router();

// Models
const Contact = require('../models/Contact');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// New Note
router.get('/contacts/add', (req, res) => {
  res.redirect('/');
});

router.post('/contacts/add', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const errors = [];
  if (!name) {
    errors.push({text: 'Escriba su nombre.'});
  }
  if (!email) {
    errors.push({text: 'Escriba su email.'});
  }
  if (!phone) {
    errors.push({text: 'Ingrese su número de teléfono celular.'});
  } else if(phone.length>=10 || phone.length <=8){
    errors.push({text: 'Ingrese correctamente el número de su teléfono celular.'});
  }
  if (!subject) {
    errors.push({text: 'Agregar el asunto.'});
  }
  if (!message) {
    errors.push({text: 'Agregar el mensaje.'});
  }
  if (errors.length > 0) {
    res.render('contact', {
      errors,
      name,
      email,
      phone,
      subject,
      message
    });
  } else {
    const newContact = new Contact({name, email, phone, subject, message});
    await newContact.save();
    req.flash('success_msg', 'Mensaje enviado, nos comunicaremos pronto!');
    res.render('contact');
  }
});

module.exports = router;
