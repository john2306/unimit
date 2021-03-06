const router = require('express').Router();
const passport = require('passport');

//helpers
const { isAuthenticated } = require('../helpers/auth');

// Models
const User = require('../models/User');

router.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/users/signup' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/notes');
  });


router.post('/users/signup', async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;

  if(name.length == 0) {
    errors.push({text: 'Ingrese un nombre.'});
  }
  if(password != confirm_password) {
    errors.push({text: 'Las contraseñas no coinciden.'});
  }
  if(password.length < 8) {
    errors.push({text: 'Las constraseñas deben ser mínimo de 8 caracteres.'})
  }
  if(errors.length > 0){
    res.render('index', {errors, name, email, password, confirm_password});
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({email: email});
    if(emailUser) {
      req.flash('error_msg', 'El email ha sido registrado.');
      res.redirect('/');
    } else {
      // Saving a New User
      const newUser = new User({name, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'Se ha registrado exitosamente.');
      res.redirect('/');
    }
  }
});

router.get('/users/signin', (req, res) => {
  res.render('index');
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/desafios',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get('/users/logout', (req, res) => {
  req.logout();
  //req.flash('success_msg', 'Regresa pronto.');
  res.redirect('/');
});

router.put('/users/update-profile/:id', isAuthenticated, async(req, res) =>{
  const {name, lastname, email, company, username, city, address, country, zipcode, aboutMe} = req.body;
  await User.findByIdAndUpdate(req.params.id, {name, lastname, email, company, username, city, address, country, zipcode, aboutMe});
  req.flash('success_msg', 'Perfil actualizado satisfactoriamente');
  res.redirect('/desafios');
});



module.exports = router;
