const router = require("express").Router()
const User = require("../model/userSchema")
const bcrypt = require("bcrypt")
const {
    siginAccessToken
} = require("../helper/jwt_helper")


//@desc for reg new user
//@route /auth/register
router.post("/register", async (req, res) => {
    try {
        const { name, password, email, gender, DOB} = req.body
        if (!name || !password || !email)
            return res.status(404).json({ error: "Enter All The Fields" })
        //check user exist or not
        const isExisted = await User.findOne({ email: email })
        if (isExisted)
            return res.json({ error: "User alerady registerd this email" });

        const saltRound = 10;
        bcrypt.genSalt(saltRound, (err, salt) => {

            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: "Internal Server Error" })
            }

            bcrypt.hash(password, salt, async (err, hashedPassword) => {

                if (err)
                    return res.status(500).json({ error: "Internal Server Error" })
                console.log(hashedPassword)
                const newUser = await new User({

                    email,
                    name,
                    DOB,
                    gender,
                    password: hashedPassword
                }).save()
                     
                  const secret = process.env.JwtSecret
                    
                
                const Token = await siginAccessToken(newUser._id, secret);
                res.json(Token)
            })
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }

})

//@desc for login
//@route /auth/login
router.post("/login", async(req, res) => {
    try{
    const { email, password } = req.body
    if (!email || !password)
        return res.status(404).json({ error: "please Enter all the fields" })

    const userFound = await User.findOne({ email });

    if (!userFound)
        return res.status(403).json({ error: "Wrong Username/Password" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
        return res.status(403).json({ error: "Wrong Username/Password" });
    
        const secret = process.env.JwtSecret
    
    const Token = await siginAccessToken(userFound._id, secret);
    res.json(Token)
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server Error"})
    }
})


module.exports = router






//