const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  //על מנת ליצור קוקי ליוזר אנו צריכים את האיידי של היוזר ממונגו דיבי
  //היוזר המועבר הוא היוזר אשר קיבלנו ממונגו דיבי
  done(null, user.id);
  //פוקנציית הדאן אחרי שהסתיים התהליך, נאל אומר שאין תקלות, יוזר אידי מועבר
  //לסירילייז, יוזר אידי הוא האיידי שמונגו דיבי נתן לאותו יוזר
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
})
//דיסירילייז לוקחת את אותו יוזר איידי שהוכנס לקוקי והופכת אותו למודל של יוזר

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
  //בוטח בנתיבים הכוללים פרוקסי כדי שלא ישנו מHTTPS לHTTP
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id })
    //לא לשכפל רשומה של יוזר קיים
    .then((existingUser) => {
      if (existingUser) {
        done(null, existingUser);
        //פוקנציית דאן מקבלת שתי ארגיומנטים הראשון האם הייתה תקלה והשני הוא היוזר
      } else {
        new User({ googleId: profile.id })
          .save()
          .then(user => done(null, user));
      }
    })
})
);