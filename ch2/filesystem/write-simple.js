'use strict'
const fs = require('fs')
fs.writeFile('target.txt', 'Hello from Simple', (err) => {
  if(err){
    throw err
  }
  console.log('File saved!')
})
// node write-simple.js