const mongoose = require("mongoose")

const DB = ()=>{
    mongoose.connect(
        process.env.DB,{
        
        useNewUrlParser:true,
        useUnifiedTopology:true,
        })
      .then(()=>console.log('connected'))
      .catch(e=>console.log(e));
      
    }
    
    module.exports = DB;



