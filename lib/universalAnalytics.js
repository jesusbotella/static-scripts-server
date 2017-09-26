var ua = require('universal-analytics');

const getUAInfoForRequest = (req) => ({
  dp: req.baseUrl,
  dh: 'http://cdn.jesusbotella.es',
  dr: req.header('Referer'),
  uip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
  ua: req.get('User-Agent')
});

exports.sendPageview = (req, _, next) => {
  const visitor = ua(process.env.GA_ID);
  visitor.pageview(getUAInfoForRequest(req)).send();
  next();
};