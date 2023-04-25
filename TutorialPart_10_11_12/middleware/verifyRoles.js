const verifyRoles = (...allowedRoles) => { // Chỗ này ta cho truyền vào nhiều tham số
    return (req, res, next) => {
        if (!req?.roles) {
            return res.sendStatus(401)
        } // nếu ko có request và nếu có request mà ko có roles
        const rolesArray = [...allowedRoles]
        console.log(rolesArray)
        console.log(req.roles)
        const result = req.roles.map(
            role => rolesArray.includes(role)
        ).find(
            val => val === true
        )
        if (!result) {
            return res.sendStatus(401)
        }
        next()
    }
}

module.exports = verifyRoles 