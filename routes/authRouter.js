const router = require("express").Router()
const User = require("../model/userSchema")
const bcrypt = require("bcrypt")
const {
    siginAccessToken,
    
} = require("../helper/jwt_helper")
const {registerValidator} = require('../helper/validator');
const { validationResult } = require('express-validator');


//@desc for reg new user
//@route /auth/register
router.post("/register",registerValidator, async (req, res) => {
    try {
        const { name, password, email, gender, DOB} = req.body
        if (!name || !password || !email)
            return res.status(404).json({ error: "Enter All The Fields" })

            const error = validationResult(req).errors;
            console.log(error);
    if (error[0]) {
            // console.log("frm",error[0].msg)

            return res.json({ error: error[0].msg })
        }    

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
                // const RefToken = await siginAccessToken(newUser._id, refsecret);

                res.json({Token})
            })
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }

})

//@desc for login
//@route /auth/login
router.post("/login",registerValidator, async(req, res) => {
    try{
    const { email, password } = req.body
    if (!email || !password)
        return res.status(404).json({ error: "please Enter all the fields" })
     const error = validationResult(req).errors;
            console.log(error);
    if (error[0]) {
            // console.log("frm",error[0].msg)

            return res.json({ error: error[0].msg })
        }
    const userFound = await User.findOne({ email });
console.log(userFound._id);
    if (!userFound)
        return res.status(403).json({ error: "Wrong Username/Password" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
        return res.status(403).json({ error: "Wrong Username/Password" });
    
        const secret = process.env.JwtSecret
        // const refsecret = process.env.JwtRefSecret

    
    const Token = await siginAccessToken(userFound._id, secret);
    // const RefToken = await siginRefreshToken(userFound._id, refsecret);

    res.json({Token})
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server Error"})
    }
})


module.exports = router





