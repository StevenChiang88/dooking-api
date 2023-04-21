const express = require("express")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const router = express.Router()
const jwt = require("jsonwebtoken")


//註冊
router.post("/register", async (req, res) => {

    try {

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        await newUser.save()
        res.status(200).json(`User ${newUser.username}創立成功`)
    }
    catch (err) {
        res.status(500).json(err)
    }

})

//登入
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return res.status(404).json("無此用戶")
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return res.status(404).json("密碼錯誤")

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWTSECRET)

        const { password, isAdmin, ...otherDetails } = user._doc
        res.status(200).json({ otherDetails, token })
    }
    catch (err) {
        res.status(500).json(err)
    }

})



module.exports = router