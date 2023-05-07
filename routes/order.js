const express = require("express");
const { verifyAdmin, verifyUser } = require("./verifyToken");
const Order = require("../models/Order");

const router = express.Router()

//Create
router.post("/", async (req, res) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err)
    }


})

// Get ALL
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    }
    catch (err) {
        console.log(err)
    }
})



module.exports = router