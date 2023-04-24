const allowedOrigins = require('./allowOrigins')
        // allow to access backend*
        // https://www.yoursite.com => cái link để thực hiện
// -- functions allow cors to do this*
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS !!!'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;