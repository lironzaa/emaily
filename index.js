const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

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

const PORT = process.env.PORT || 5000;
//נותן להרוקו להחליט לאיזה פורט האפליקציה שלנו צריכה להזמין מתוך קובץ
//הסביבה שלהם, במידה ואין קובץ האזן ל5000
app.listen(PORT);