require('marko/node-require').install()
require('marko/express') //enable res.marko
const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
  res.marko(require('./views/report.marko'))
})

module.exports = router
