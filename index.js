const express = require("express")
const app = express()
const env = require("dotenv")
const morgan = require("morgan")

app.use(express.json())
env.config()
PORT=process.env.PORT
app.use(morgan('dev'))
require("./helper/DB")()

app.use("/",require("./routes/spacexRouter"))
app.use("/auth",require("./routes/authRouter"))


app.listen(PORT,()=>console.log(`server running on port ${PORT}`))