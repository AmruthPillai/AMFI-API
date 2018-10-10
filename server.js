var express = require('express')
var app = express()

var api = require('./api')

app.use('/', api)

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})