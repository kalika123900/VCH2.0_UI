/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const path = require('path');
const { resolve } = require('path');
const favicon = require('serve-favicon');
const logger = require('./logger');
const rawicons = require('./rawicons');
const rawdocs = require('./rawdocs');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');

const app = express();
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
  ? require('ngrok')
  : false;

// Load material icons
app.use('/api/icons', (req, res) => {
  res.json({
    records: [
      { source: rawicons(req.query) }
    ]
  });
});

// Load code preview
app.use('/api/docs', (req, res) => {
  res.json({
    records: [
      { source: rawdocs(req.query) }
    ]
  });
});

app.use('/', express.static('public', { etag: false }));
app.use(favicon(path.join('public', 'favicons', 'favicon.ico')));

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
