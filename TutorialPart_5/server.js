// -- include some common core modules
const http = require('http')
const fs = require('fs')
const path = require('path')
const fsPromises = require('http').promises

// -- part 3 4
const logEvents = require('./logEvents');
const EventEmiiter = require('events');
class Emitter extends EventEmiiter { };
// initialize object
const myEmitter = new Emitter();

// -- address of local host 
const PORT = process.env.PORT || 3500

// -- define a port -> create a server
const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
})

// -- chưa chạy server nên cần listen for request
server.listen(PORT, () => console.log(
    `Server runs on PORT ${PORT}`
))


// add listener for the log event 
// myEmitter.on('log', (msg) => logEvents(msg));
//     myEmitter.emit('log', 'Log event emitted !!!')