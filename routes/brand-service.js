
'use strict'
const http = require('http')
const url = require('url')
const brands = ['Gazzele', 'Batavus', 'Azor', 'Cortina', 'Giants', 'Sparta']
const MISSING = 3

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url)
  let id = pathname.match(/^\/(\d+)$/)

  if(!id) {
    res.statusCode = 400
    return void res.end()
  }

  id = Number(id[1])

  if(id === MISSING) {
    res.statusCode = 404
    return void res.end()
  }

  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    id: id,
    name: brands[id % brands.length]
  }))
})

server.listen(process)