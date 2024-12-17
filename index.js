const app = require("express")()
const router = require("./routes/route");
const PORT = 3000;



app.set("view engine", "ejs")

app.use('/', router)

app.listen(PORT, () => console.log('server has initiated'))