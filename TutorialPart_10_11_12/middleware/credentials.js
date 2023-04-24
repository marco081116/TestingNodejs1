// part 11: Do là bên front end khi fetch thì trong console trả về lỗi
// Access-Control-Allow-Credentials header in the respose is '' => do chưa làm
// và nó phải trả về true

const allowedOrigins = require('../config/allowedOrigins')

const credentials = (req, res, next) => {
    const origin = req.headers.origin
    if (allowedOrigins.includes(origin)) {
        res.headers('Access-Control-Allow-Credentials', true)
    }
    next()
}

module.exports = credentials;