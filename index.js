const express = require('express')
const app = express()
const cookieParser = require("cookie-parser")
const path = require("node:path")
const router = require("./routes/route");
const connect = require('./db/connect');
const { checkForAuthCookie } = require('./middleware/authentication');
const routerBlog = require('./routes/blog');
const PORT = 3000;

connect()
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.resolve("./public")))
app.set("view engine", "ejs")
app.use(checkForAuthCookie("token"))

app.use('/', router)
app.use("/addblog", routerBlog)
app.listen(PORT, () => console.log('server has initiated'))