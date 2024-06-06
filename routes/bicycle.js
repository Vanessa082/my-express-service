var express = require('express')
var router = express.Router()
var model = require('../model')

function queryHasOwnProperty(o, p) {
  return Object.prototype.hasOwnProperty.call(o, p);
};

function validateQueryData(o) {
  let valid = o !== null && typeof o === 'object'
  valid = valid && queryHasOwnProperty(o, 'brand')
  valid = valid && queryHasOwnProperty(o, 'color')
  valid = valid && typeof o.brand === 'string'
  valid = valid && typeof o.color === 'string'
  return valid && {
    brand: o.brand,
    color: o.color
  }
}

function validateBody(o) {
  let valid = o !== null && typeof o === 'object'
  valid = valid && queryHasOwnProperty(o, 'data')
  valid = valid && o.data !== null && typeof o.data === 'object'
  valid = valid && validateQueryData(o.data)
  return valid && data && {
    data: data
  }
}


function isIdValid(n) {
  n = Number(n)
  const MAX_SAFE = Math.pow(2, 53) - 1
  return isFinite(n) && Math.floor(n) === n && Math.abs(n) <= MAX_SAFE
}

function isParamsValid(o) {
  let valid = o !== null && typeof o === 'object'
  valid = valid && queryHasOwnProperty(o, 'id');
  valid = valid && isIdValid(o.id);
  return valid;
}

function badRequest() {
  const err = new Error('Bad request');
  err.status = 400;
  return err;
}
router.get('/:id', function (req, res, next) {
  if (isParamsValid(req.params)) {
    model.bicycle.read(req.params.id, (err, result) => {
      if (err) {
        if (err.message === 'not found') next()
        else next(err)
      } else {
        const sanitizedResult = validateQueryData(result)
        if (sanitizedResult) {
          res.send(sanitizedResult)
        } else {
          next(new Error('Server Error'))
        }
      }
    });
  } else {
    next(badRequest())
  }
})

router.post('/:id', function (req, res, next) {
  if (isParamsValid(req.params)) {
    var body = validateBody(req.body)
    if (body) {
      model.bicycle.read(req.params.id, body.data, (err) => {
        if (err) {
          if (err.message === 'not found') next()
          else next(err)
        } else {
          res.status(204).send();
        }
      });
    } else {
      next(badRequest())
    }
  } else {
    next(badRequest())
  }
});

router.put('/:id', function (req, res, next) {
  if (isParamsValid(req.params)) {
    var body = validateBody(body)
    if (body) {
      model.bicycle.read(req.params.id, body.data, (err) => {
        if (err) {
          if (err.message === 'resource exists') {
            model.bicycle.update(req.params.id, body.data, (err) => {
              if (err) next(err)
              else res.status(204).send()
            })
          } else {
            next(err)
          }
        } else {
          res.status(201).send({});
        }
      });
    } else {
      next(badRequest)
    }
  } else {
    next(badRequest())
  }
});

router.delete('/:id', function (req, res, next) {
  if (isParamsValid(req.params)) {
    model.bicycle.read(req.params.id, (err, result) => {
      if (err) {
        if (err.message === 'not found') next()
        else next(err)
      } else {
        res.status(204).send()
      }
    });
  } else {
    next(badRequest())
  }
});

module.exports = router

