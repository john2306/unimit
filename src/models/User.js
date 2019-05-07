const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false },
  email: { type: String, required: true },
  company: { type: String, required: false },
  username: { type: String, required: false },
  city: { type: String, required: false },
  country: { type: String, required: false },
  zipcode: { type: String, required: false },
  address: { type: String, required: false },
  aboutMe: { type: String, required: false },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
