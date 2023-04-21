const mongoose = require("mongoose")

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        max: 10,
        min: 0
    },
    rooms: {
        type: [String]
    },
    featured: {
        wifi: { type: Boolean },
        service: { type: Boolean },
        service24: { type: Boolean },
        parking: { type: Boolean },
    },
    cheapeastPrice: {
        type: Number,
        required: true
    },
    showOnHomePage: Boolean
})

module.exports = mongoose.model("Hotel", HotelSchema)