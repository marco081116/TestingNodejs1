// how Node js different from 'Vanilla JS' ?:

// 1) Node run on a server - not a browser (back-end not front-end)
// 2) The console is the terminal window
console.log('Hello !!!'); // node server (write in terminal)
// 3) global object (instead window object)
// console.log(global);
// 4) Has common modules that we will explore (relate to the operating system, files system, ... )
// 5) CommonJS modeles instead of 'ES6 modules' ?

const os = require('os');
const path = require('path');

console.log(os.type())
console.log(os.version())
console.log(os.homedir())

console.log(__dirname)
console.log(__filename)

console.log(path.dirname(__filename))
console.log(path.basename(__filename))
console.log(path.extname(__filename))

console.log(path.parse(__filename))