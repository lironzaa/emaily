const mongoose = require('mongoose');
const { Schema } = mongoose;
//מאפשר ליצור את המבנה של הסכמה החדשה

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);