const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
//כל פונקציות היוס מתייחסות למידלוורים הבודקים בכל בקשה שיש ליוזר קוקי עם האיידי
//פונקציה המגדירה את הגדרות הקוקיס, קייס מתייחס להצפנה 
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);
//מקובץ הראוטס ייצאנו פונקציה, הפונקציה רצה עם המשתנה אפפ
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  //דואג שאקספרס תגיש את נכסי הפרודקשן שלנו כמו קבצי גיסי וסיאיאס בכל בקשה לשרת
  app.use(express.static('client/build'));

  //אקספרס תגיש את קובץ האינקס במידה והיא לא מזהה את הראוט
  //כמו הפניית HTACESS בPHP
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
//נותן להרוקו להחליט לאיזה פורט האפליקציה שלנו צריכה להזמין מתוך קובץ
//הסביבה שלהם, במידה ואין קובץ האזן ל5000
app.listen(PORT);