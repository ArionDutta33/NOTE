const jwt = require("jsonwebtoken")
function autheticateToken(req, res, next) {
    const authUser = req.headers("authorization")
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) return res.sendStatus(401)
    jwt.verify(token, "secret", (err, user) => {
        if (err) return res.sendStatus(401)
        req.user = user
        next()
    })
}

module.exports = {
    autheticateToken
}