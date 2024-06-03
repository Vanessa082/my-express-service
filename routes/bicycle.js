var express = require('express')
var router = express.Router()
var model = require('../model')

router.get('/ : id', function (req, res, next) {
  model.bicycle.read(req.params.id, (err, result) => {
    if (err) {
      if (err.message === 'not found') next()
    }
  })
})

