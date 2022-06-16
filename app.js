const express = require("express")
const app = express()
const env = require("dotenv")
const morgan = require("morgan")
const {verifyUserAccessToken} = require("./helper/jwt_helper")

app.use(express.json())
env.config()
PORT=process.env.PORT
app.use(morgan('dev'))
require("./helper/DB")()

//test
app.get("/test",verifyUserAccessToken,(req,res)=>{
    res.json("hello there")
})

app.use("/auth",require("./routes/authRouter"))
app.use("/all",require("./routes/allRouter"))
app.use("/",verifyUserAccessToken,require("./routes/spacexRouter"))


app.listen(PORT,()=>console.log(`server running on port ${PORT}`))