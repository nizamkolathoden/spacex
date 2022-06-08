const router = require("express").Router()
const Rocket = require("../model/spaceSchema")


//@desc post a new rocket detials
//@route /all/create/rocket

router.post("/create/rocket",async(req,res)=>{
    try {
        const {launchedDate,location,orbit,launchedStatus,rocket,
            mission,FlightNumber,RocketTvpe,Manufacturer,
            Nationality,PavloadType,desc}=req.body

    const newRocket = await new Rocket({
        mission,
        FlightNumber,
        RocketTvpe,
        Manufacturer,
        Nationality,
        PavloadType,
        desc,
        launchedDate,
        location,
        orbit,
        launchedStatus,
        rocket
    }).save()

    console.log(newRocket);
res.json("sucessfully added a rocket")

    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
    
    
})

module.exports = router