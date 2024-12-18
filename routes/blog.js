const routerBlog = require("express").Router()

routerBlog.get("/", (req, res) => {
    res.render("addBlog", { user: req.user })
})

module.exports = routerBlog