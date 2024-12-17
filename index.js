const express = require('express')
const app = express()
const cookieParser = require("cookie-parser")

const router = require("./routes/route");
const connect = require('./db/connect');
const { checkForAuthCookie } = require('./middleware/authentication');
const PORT = 3000;

connect()
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.set("view engine", "ejs")
app.use(checkForAuthCookie("token"))

app.use('/', router)

app.listen(PORT, () => console.log('server has initiated'))