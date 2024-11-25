const messageModel = require('../model/messageModel');

module.exports.addMessage = async(req,res,next) => {
    try{
        const {from,to,message} = req.body;
        if (!from || !to || !message) {
            return res.status(400).json({msg: "Missing required fields"});
        }
        const data = await messageModel.create({
            message:{text:message},
            users:[from,to],
            sender:from,
        });
        if (data) return res.status(201).json({msg: "Message added"});
        return res.status(400).json({msg: "Failed to add message"});
    }catch(ex){
        next(ex)
    }
}
module.exports.getAllMessage = async(req,res,next) => {
    try{
        const {from,to} = req.body;
        const messages = await messageModel.find({
            users:{
                $all:[from,to],
            },
        })
        .sort({updatedAt:1});
        const projectedMessages = messages.map((msg)=>{
            return {
                fromSelf:msg.sender.toString() === from, //msg.sender identifier rakhta hai aur check krega ki msg query user se hi aya hai na ki kahi aur se
                message:msg.message.text, //msg.message text data rakhta hai aur .text value ke liye
            };
        });
        res.json(projectedMessages);
    }catch(ex){
        next(ex)
    }
}
