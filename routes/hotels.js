const express = require("express")
const Hotel = require("../models/Hotel")
const { verifyAdmin } = require("./verifyToken")
const Room = require("../models/Room")

const router = express.Router()


// Create
router.post("/", verifyAdmin, async (req, res) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }
    catch (err) {
        res.status(500).json(err)
    }
})
// Update
router.put("/:id", verifyAdmin, async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true })

        res.status(200).json(updatedHotel)
    }
    catch (err) {
        res.status(500).json(err)
    }
})
//Delete
router.delete("/:id", verifyAdmin, async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)

        res.status(200).json("刪除成功")
    }
    catch (err) {
        res.status(500).json(err)
    }
})
//Get 
router.get("/find/:id", async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id)

        res.status(200).json(hotel)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//Get Hotel type count 
router.get("/typeCount", async (req, res) => {

    try {
        const hotelCount = await Hotel.countDocuments({ type: "飯店" })
        const villaCount = await Hotel.countDocuments({ type: "Villa" })
        const woodenCount = await Hotel.countDocuments({ type: "小木屋" })
        const youngCount = await Hotel.countDocuments({ type: "青年旅館" })

        res.status(200).json({
            飯店: hotelCount,
            Villa: villaCount,
            小木屋: woodenCount,
            青年旅館: youngCount,
        })
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//Get show On Homepage Hotels 
router.get("/featured", async (req, res) => {

    try {
        const featuredHotels = await Hotel.find({ showOnHomePage: true })
        res.status(200).json(featuredHotels)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


//Get Hotels in query
router.get("/", async (req, res) => {
    const { min, max, city } = req.query
    try {
        const featuredHotels = await Hotel.find({
            cheapeastPrice: {
                $gte: min, $lte: max
            },
            city: city
        })
        res.status(200).json(featuredHotels)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


//Get rooms from single hotel

router.get("/getrooms/:id", async (req, res) => {

    try {
        const hotel = await Hotel.findById(req.params.id)
        const rooms = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room)
            }))
        res.status(200).json(rooms)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})




module.exports = router