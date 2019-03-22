module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }
  next();
};
//נקסט הוא המידלוור הבא או הראוט הבא בתור שיפעל אחרי שהמידלוור הזה יסיים את הפעולה