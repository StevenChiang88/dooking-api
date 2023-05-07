const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    userID: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    hotel: {
        type: String,
        required: true,
    },
    rooms:
        [{ roomID: { type: String }, roomTitle: { type: String }, roomPrice: { type: Number } }]
    ,
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model("Order", OrderSchema)