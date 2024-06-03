'use strict'
module.export = {
  bicycle: bicycleModel()
}

function bicycleModel() {
  const db = {
    1: {brand: 'Veloretti', color: 'green'},
    2: {brand: 'Batavus', color: 'yellow'}
  }
}

return{
  read
}

function read (id, cb){
  if(!(db.hasOwnProperty)) {
    const err = Error('not found')
    setImmediate(() =>cb(err))
    return
  }
  setImmediate(() =>cb(null, db[id]))
}