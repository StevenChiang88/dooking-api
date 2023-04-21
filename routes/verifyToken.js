const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        //登入時會jwt會生成token，把token存到localStorage或是cookie，現在拿出來檢查是否一樣
        jwt.verify(authHeader, process.env.JWTSECRET, (err, user) => {
            if (err) res.status(403).json("token過期或錯誤token");
            //是的話將jwt的user賦值給req，供給下個function檢查userID是否一樣或是否為Admin
            req.user = user;
            next()
        })
    } else {
        return res.status(401).json("您沒有token權限")
    }
}


const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("您未被授權進行此操作")
        }
    })
}


const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("您不是管理員，無法進行此操作")
        }
    })
}

module.exports = { verifyToken, verifyUser, verifyAdmin }