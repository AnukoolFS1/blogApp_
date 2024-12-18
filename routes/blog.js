const routerBlog = require("express").Router()

routerBlog.get("/", (req, res) => {
    res.render("addBlog", { user: req.user })
})

routerBlog.post("/blog", (req,res) => {
    console.log(req)

    res.redirect("/")
})

module.exports = routerBlog