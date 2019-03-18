const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }
  )
  );
  //ניסיון התחברות בעזרת פספורט

  app.get('/auth/google/callback', passport.authenticate('google'));
  //ראוט לקלבאק אחרי שחזרנו בהצלחה מהשרת של גוגל, כעת נחזור עם קוורי סטרינג ופספורט
  //יזהה את זה אוטומטי

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  })
};