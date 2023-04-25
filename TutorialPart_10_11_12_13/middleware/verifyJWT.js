// -- part 11
const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    // const authHeader = req.headers['authorization'];
    // -- part 12
    const authHeader = req.headers.authorization || req.headers.Authorization; // cho trường hợp trả về A in
    if(!authHeader?.startsWith('Bearer ')) { // nếu có authHeader rồi mà nó vẫn ko startsWith 'Bearer ' thì lỗi form vẫn là lỗi
        return res.sendStatus(401)
    }
    // console.log(authHeader) // chỗ này sẽ output 'bearer token'
    const token = authHeader.split(' ')[1] // nếu đúng sẽ ra bearer token và lấy phần tử thứ 1(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.sendStatus(403) // => invalid token
            }
            // req.user = decoded.username
            // -- part 12
            req.user = decoded.UserInfo.username // Do đã sửa lại thành UserInfo 
            req.roles = decoded.UserInfo.roles 
            next()
        }
    )
}

module.exports = verifyJWT
// sau khi middle xong thì gửi qua route để route bảo vệ