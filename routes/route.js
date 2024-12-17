const Users = require('../models/users')
const router = require("express").Router()

router.get('/', (req, res) => {
    res.render("home")
})

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.get('/signin', (req, res) => {
    res.render("signin")
})

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;

    const isMatched = await Users.checkPassword(email, password)

    console.log(isMatched)
    if(!isMatched) return res.redirect("/signin")

    return res.render("succes")
})

router.post('/signup',async (req, res) => {
    const {fullName, email, password} = req.body;

    await Users.create({
        fullName, email, password
    })

    res.redirect('/signin')
})




module.exports = router