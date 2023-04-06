// Part 3
// const { format } = require('date-fns'); //  Trong terminal => npm install date-fns
// const { v4: uuid } = require('uuid');

// // npm run dev
// console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))
// console.log(uuid())

// Part 4 - emit: phát ra
const logEvents = require('./logEvents');
const EventEmiiter = require('events');

class MyEmitter extends EventEmiiter { };

// initialize object
const myEmitter = new MyEmitter();

// add listener for the log event 
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
    // Emit event
    myEmitter.emit('log', 'Log event emitted !!!')
}, 2000); // wait for 2 sec