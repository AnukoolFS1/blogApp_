const routerBlog = require("express").Router();
const BlogModel = require('../models/blogs')
const multer = require("multer");
const path = require('node:path');
const fs = require('node:fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userDir = path.join(__dirname, "../", "/public", "/uploads", `/${req.user._id}`)
        if (fs.existsSync(userDir)) {
            cb(null, path.resolve(`./public/uploads/${req.user._id}`))
        } else {
            fs.mkdir(userDir, (err) => {
                if (err) return console.log(err)
                else cb(null, path.resolve(`./uploads/${req.user._id}`))
            })
        }
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage })

routerBlog.get("/", (req, res) => {
    if(!req.user) return res.redirect("/signin")
    else res.render("addBlog", { user: req.user })
})

routerBlog.post("/", upload.single('img'), async (req, res) => {
    const { title, body } = req.body
    await BlogModel.create({
        title, body, createdBy: req.user._id, coverImgUrl: `/uploads/${req.user._id}/${req.file.filename}`
    })

    res.render("blog", {blog, user: req.user})
})

routerBlog.get("/:id", async (req, res) => {
    const blog = await BlogModel.findById(req.params.id);
    return res.render('blog', {
        blog, user: req.user
    })

})

module.exports = routerBlog