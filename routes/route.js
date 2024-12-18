const Users = require('../models/users')
const router = require("express").Router()

router.get('/', (req, res) => {
    res.render("home", {user: req.user})
})

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect('/')
})

router.get('/signin', (req, res) => {
    res.render("signin")
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {

        const token = await Users.checkPassword(email, password)

        if (!token) {return res.render("signin",  {
            error: "Incorrect email or password"
        })}

        return res.cookie("token", token).redirect("/")
    }catch(err){
        console.error(err);
        res.render("signin", {
            error: "server error"
        })
    }
})

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    await Users.create({
        fullName, email, password
    })

    res.redirect('/signin')
})




module.exports = router