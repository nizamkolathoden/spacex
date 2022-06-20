const router = require("express").Router()

const Rocket = require("../model/spaceSchema")

const client = require("../helper/redis_int")



//@desc get all rockets
//@route spacex/all/rockets

router.get("/all/rockets",async(req,res)=>{
    try {


        //pagintion
        let {page,size}=req.query
        if(!page){
            page=1
        }
        if(!size){
            size=10
        }
        const limit = parseInt(size)
        const skip= (page-1)*size
        const status = req.query.status
        let rockets
        if(!status){
            // console.log(status);
            const value = await client.get(`rockets${page}${size}${status}`);
            console.log(value);

            if(value){
                console.log("from cache",JSON.parse(value));
                rockets=JSON.parse(value)
            }else{
                console.log("from db");
            rockets = await Rocket.find({},{
                launchedStatus:1,
                location:1,
                mission:1,
                orbit:1,
                launchedDate:1,
                rocket:1

            }).limit(limit).skip(skip)
            console.log(rockets.length);
        }
    
        }else{
            const value = await client.get(`rockets${page}${size}${status}`);
            console.log(value);
            if(value){
                console.log("from cache",JSON.parse(value));
                rockets=JSON.parse(value)

            }else{
            rockets = await Rocket.find({launchedStatus:status},{
                launchedStatus:1,
                location:1,
                mission:1,
                orbit:1,
                launchedDate:1,
                rocket:1
            
            }).limit(limit).skip(skip)
        }

        }
        await client.SET(`rockets${page}${size}${status}`,JSON.stringify(rockets),{
            EX:10,
            NX:true
        });

        // console.log("data",await client.GET(`rockets${page}${size}${status}`));

         res.json({
        rockets,
        page,
        size:rockets.length
    })
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})

//@desc for geting single rocket
//route /spacex/single/rocket:id
router.get("/single/rocket/:id",async(req,res)=>{
    try {
        
    const id = req.params.id
    const value = await client.GET(`rocket${id}`)
    if(value){
        return res.json(JSON.parse(value))
    }
    const singleRocket = await Rocket.findById(id)
    await client.SET(`rocket${id}`,JSON.stringify(singleRocket),{
        EX:10,
        NX:true
    });
    res.json(singleRocket)
    } catch (err) {
        res.status(500).json({error:"Internal Server Error"})
        console.log(err)
    }
})

module.exports = router