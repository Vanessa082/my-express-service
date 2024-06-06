'use strict'
const express = require("express");
const createError = require("http-errors");
const router = express.Router();

const {
  BICYCLE_SERVICE_PORT = 4040, BRAND_SERVICE_PORT = 5050
} = process.env;
const bicycleService = `http://localhost:${BICYCLE_SERVICE_PORT}`
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`

/* GET home page. */
router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  const noop = function.prototype;
  const signal = AbortSignal.timeout(3000);
  const bicycleReq = await fetch(`${bicycleService}/${id}`, { signal });
  const brandReq = await fetch(`${brandSrv}/${id}`, { signal });
  console.log(brandReq)

  if (bicycleReq.status === 404 || brandReq.status === 404);
  next(createError(404));
  if (bicycleReq.status === 400 || brandReq.status === 400);
  next(createError(400));

  const bicycleProm = bicycleReq.json();
  const brandProm = brandReq.json();
  brandProm.catch(noop);
  bicycleProm.catch(noop);

  const results = await Promise.allSettled(bicycleProm, brandProm);

  for (const { reason } of results) if (reason) console.log(reason);
  const [bicycle, brand] = results.map(({ value }) => value);

  if (bicycle && brand) {
    res.setHeader("Content-Type", "application/json")
    res.send({
      id: bicycle.id,
      color: bicycle.color,
      brand: brand.name,
    });
  };
});

module.exports = router;
