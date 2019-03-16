const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' })
});

const PORT = process.env.PORT || 5000
//נותן להרוקו להחליט לאיזה פורט האפליקציה שלנו צריכה להזמין מתוך קובץ
//הסביבה שלהם, במידה ואין קובץ האזן ל5000
app.listen(5000);