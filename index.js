const express = require("express")

const app = express()
const env = require("dotenv")
app.use(express.json())
env.config()
PORT=process.env.PORT

require("./helper/DB")()

app.use("/",require("./routes/spacexRouter"))

app.listen(PORT,()=>console.log(`server running on port ${PORT}`))