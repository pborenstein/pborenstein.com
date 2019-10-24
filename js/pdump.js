const decycle = require('json-cycle').decycle
const debug = require("debug")("pdump");


module.exports = function pdump(obj) {
  let d2 = obj;
  d2 = decycle(obj)
  let decycled = JSON.stringify(decycle(obj), null, 2)

  return decycled;
}
