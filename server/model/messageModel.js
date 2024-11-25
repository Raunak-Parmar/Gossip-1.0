const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message:{
        text:{
            type:String,
            required:true,
        },
    },
        users:Array,
        sender:{
            type:mongoose.Schema.Types.ObjectId, //object id ka ek references lelega
            ref:"User",
            required:true,
        },
},
{timestamps:true});

module.exports = mongoose.model("Message",messageSchema);