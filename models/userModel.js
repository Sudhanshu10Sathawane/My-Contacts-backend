const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    userName:{
        type: String,
        required:[true,"Please add username"]
    },
    email:{
        type:String,
        required:[true,"Please add email"],
        unique:[true,"Email already exist"]
    },
    password:{
        type:String,
        required:[true,"Please add the password"]
    }
},{
    timestamp:true
});
module.exports=mongoose.model("User",userSchema);