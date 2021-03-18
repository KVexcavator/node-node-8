'use strict'
const fs = require('fs')
const net = require('net')
const filename = process.argv[2]

if(!filename){
  throw Error('Error: No filename specified.')
}

net.createServer(connection => {
  // Reporting
  console.log('Subscriber conneced.')
  connection.write(`Now watching "${filename}" for changis...`)
  // Watcher setup
  const watcher = fs.watch(filename, () => connection.write(`File changed: ${new Date()}\n`))
  // Cleanup
  connection.on('close', () => {
    console.log('Subscriber disconnected.')
    watcher.close()
  })
}).listen('/tmp/watcher.sock', () => console.log('Listening for subscribers...'))
// need three terminal sessions:
// watch -n 1 touch target.txt
// node net-watcher-unix.js target.txt
// nc -U /tmp/watcher.sock