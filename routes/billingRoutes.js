const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
      //הטוקן שמאשר את התשלום
    })

    req.user.credits += 5;
    //יוזר מגיע מפספורט
    const user = await req.user.save();
    //שמירה של היוזר מחדש במונגו
    res.send(user);
    //שליחה של הנתונים לדפדפן
  })
};