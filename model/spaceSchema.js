const mongoose = require("mongoose")

const spacexSchema = new mongoose.Schema({
    
    mission:{
        type:String
    },
    FlightNumber:String,
    RocketTvpe:String,
    Manufacturer:{
        type:String,
        default:"SpaceX"
    },
    Nationality:{
        type:String,
        default:"SpaceX"
    },
    PavloadType:String,
    launchSite:String,
    No:{
        type:Number
    },
    launchedDate:{
        type:Date
    },
    location:{
        type:String
    },
    orbit:{
        type:String
    },
    launchedStatus:{
        type:String
    },
    rocket:{
        type:String
    },
    desc:{
        type:String
    },

})

module.exports=mongoose.model('spacex',spacexSchema)