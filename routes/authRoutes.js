const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }
  )
  );
  //ניסיון התחברות בעזרת פספורט

  app.get('/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
      //רידיירקט מעביר את היוזר למקום אחר אחרי שהוא עובר בהצלחה את הנתיב הזה
    }
  );
  //ראוט לקלבאק אחרי שחזרנו בהצלחה מהשרת של גוגל, כעת נחזור עם קוורי סטרינג ופספורט
  //יזהה את זה אוטומטי, כעת תרוץ הפונקציה בארגיומנט השני בקובץ פספורט

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  })
};