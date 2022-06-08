const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        lowercase:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        default:"Male"
    },
    DOB:{
        type:Date,
    }
})


module.exports = mongoose.model('user',userSchema);