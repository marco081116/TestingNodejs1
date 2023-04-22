// -- part 10
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {
        this.users = data
    }
}
const { json } = require('express')
// -- part 11
const jwt = require('jsonwebtoken')
require('dotenv').config()

// -- part 10

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) { // check xem có cookie ko? nếu có thì có jwt chưa ?
        return res.sendStatus(401)
    }
    console.log(cookies.jwt)

    const refreshToken = cookies.jwt

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    if (!foundUser) {
        return res.sendStatus(403) // forbiden
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) {
                return res.sendStatus(403)
            }
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            )
            res.json({ accessToken })
        }
    )
}

module.exports = { handleRefreshToken }