// /backend/middleware/translationMiddleware.js
const i18n = require('i18n');

i18n.configure({
  locales: ['en', 'es'],
  directory: __dirname + '/locales',
  defaultLocale: 'en',
  queryParameter: 'lang',
});

module.exports = (req, res, next) => {
  i18n.setLocale(req.query.lang || 'en');
  req.t = i18n.__;
  next();
};
