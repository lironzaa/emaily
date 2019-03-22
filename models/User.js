const mongoose = require('mongoose');
const { Schema } = mongoose;
//מאפשר ליצור את המבנה של הסכמה החדשה

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);