const express = require("express")
const User = require("../models/User")
const { verifyUser, verifyAdmin } = require("./verifyToken")
const router = express.Router()


// Update
router.put("/:id", verifyUser, async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        res.status(200).json(updateUser)
    }
    catch (err) {
        res.status(500).json(err)
    }
})
//Delete
router.delete("/:id", verifyAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)

        res.status(200).json("刪除成功")
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// Get ALL
router.get("/", verifyAdmin, async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router