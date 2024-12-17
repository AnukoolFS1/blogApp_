const express = require('express')
const app = express()

const router = require("./routes/route");
const connect = require('./db/connect')
const PORT = 3000;

connect()
app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs")

app.use('/', router)

app.listen(PORT, () => console.log('server has initiated'))