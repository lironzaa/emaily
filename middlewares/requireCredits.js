module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits' });
  }
  next();
};
//נקסט הוא המידלוור הבא או הראוט הבא בתור שיפעל אחרי שהמידלוור הזה יסיים את הפעולה