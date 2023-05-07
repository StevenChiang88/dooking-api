const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const hotelsRoute = require("./routes/hotels")
const roomsRoute = require("./routes/rooms")
const usersRoute = require("./routes/users")
const orderRoute = require("./routes/order")

const cors = require("cors")
dotenv.config()



mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("db連結成功");
  })
  .catch((err) => {
    console.log(err, "db連接失敗");
  });

const app = express()
app.use(cors())
// middlewares
//從postman或網站發出來的jsonFile要先轉成json
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)
app.use("/api/order", orderRoute)




app.listen(8800, () => {
  console.log("連接後端")
})