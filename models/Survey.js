const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientShcema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientShcema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  //משייך את הסקר לאיזה איידי הוא שייך, הרף משייך 
  //לאיזה דוקומנט אנחנו מקשרים את הסקר
  //אנדרסקור היא מוסכמה לקישור בין דוקומנטס
  dateSent: Date,
  lastResponded: Date
});
mongoose.model('surveys', surveySchema);