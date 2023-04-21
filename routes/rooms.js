const express = require("express");
const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const { verifyAdmin } = require("./verifyToken");

const router = express.Router()

//Create
router.post("/:hotelid", async (req, res) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        try {
            //room一建立，就去hotelSchema創立新的room
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        } catch (err) {
            res.status(500).json(err)
        }
        res.status(200).json(savedRoom)
    } catch (err) {
        res.status(500).json(err)
    }

})


// Update
router.put("/:id", verifyAdmin, async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true })

        res.status(200).json(updatedRoom)
    }
    catch (err) {
        res.status(500).json(err)
    }
})
//Delete 房型
router.delete("/:hotelId/:roomTypeId", verifyAdmin, async (req, res) => {
    const roomTypeId = req.params.roomTypeId;
    const hotelId = req.params.hotelId;

    try {
        await Room.findByIdAndDelete(roomTypeId)
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomTypeId } })

        } catch (err) {
            res.status(500).json(err)
        }

        res.status(200).json("成功刪除房型")
    }
    catch (err) {
        res.status(500).json(err)
    }
})
//Get 
router.get("/:id", async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)

        res.status(200).json(room)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// Get ALL
router.get("/", async (req, res) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router