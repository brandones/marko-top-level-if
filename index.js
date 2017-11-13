require('marko/node-require').install()
require('marko/express') //enable res.marko
const express = require('express')
const bodyParser = require('body-parser')
const serveStatic = require('serve-static')
const requestLanguage = require('express-request-language')
// Ours
const pages = require('./pages')

const app = express()

// Configure lasso to control how JS/CSS/etc. is delivered to the browser
require('lasso').configure({
  plugins: [
    'lasso-marko' // Allow Marko templates to be compiled and transported to the browser
  ],
  outputDir: __dirname + '/static', // Place all generated JS/CSS/etc. files into the "static" dir
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/static', serveStatic(__dirname + '/static'))

// Routes
app.use('/', pages)

const port = 8080
app.listen(port, function() {
  console.log('Web server started at http://localhost:' + port + '/')
  if (process.send) {
    process.send('online')  // for browser-refresh
  }
})

module.exports = app
