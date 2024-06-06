'use strict'
const express = require("express");
const axios = require("axios");
const router = express.Router();

const {
   BICYCLE_SERVICE_PORT = 4040,  BRAND_SERVICE_PORT=5050 
  } = process.env;
const bicycleService = 'http://localhost:${BICYCLE_SERVICE_PORT}'
const brandSrv = 'http://localhost:${BRAND_SERVICE_PORT}'  

/* GET home page. */
router.get("/:id", async function(req, res, next) {
  const { id } = req.params;
  const { data: bicycle } = await axios.get(`${bicycleService}/${id}`)
  const { data: brand } = await axios.get(`${brandSrv}/${id}`)
  res.setHeader("Content-Type", "application/json")
  res.send({
    id: bicycle.id,
    color: bicycle.color,
    brand: brand.name,
  })
});

module.exports = router;
