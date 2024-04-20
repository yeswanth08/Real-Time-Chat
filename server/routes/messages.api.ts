import express,{Request,Response} from "express";
import connect from "../models/db";
import messagemodel from "../models/message.model";
import conversationmodel from "../models/conversation.model";


const app = express.Router();

app.post('/setmessage', connect, async (req:Request,res:Response)=>{
    try{
        const newmessage = new messagemodel(req.body);
        await newmessage.save();
        await conversationmodel.findByIdAndUpdate(req.body.conversationid,{messages: req.body.text});
        res.status(200).json({msg: "message added"});
    }catch(err){
        res.status(500).json({msg: "something went wrong"});
    }
})


app.get('/getmessage',connect,async (req:Request,res:Response)=>{
    try{
        const payload = await messagemodel.find({conversationid: req.params.id});
        res.status(200).json({msg: payload});
    }catch(err){
        res.status(500).json({msg: `${err}`});
    }
})


export default app;