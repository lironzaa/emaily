if (process.env.NODE_ENV === 'production') {
  //בודק בקובץ של הורוקו אם אנחנו בגרסא של הפרודקשן
  //במידה ואנחנו בסביבת הפרודקשן נייצא את המפתחות של גרסת הפרודקשן
  module.exports = require('./prod');
} else {
  //במידה ואנחנו בסביבת הפיתוח נייצא את המפתחות של גרסת הפיתוח
  module.exports = require('./dev');
}