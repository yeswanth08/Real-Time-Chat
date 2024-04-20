import conversationmodel from "../models/conversation.model";
import express,{Request,Response} from "express";
import connect from "../models/db";


const app = express.Router();

app.post('/',connect,async(req:Request,res:Response)=>{
    try{
        let senderid = req.body.senderid;
        let reciverid =  req.body.reciverid;
        const exist = await conversationmodel.findOne({members:{$all:[senderid,reciverid]}});

        if(exist) return res.status(200).json({msg: "user already found"});
        else{
            const newconversation = await conversationmodel.create({members: [senderid,reciverid]});
            await newconversation.save();
            res.status(200).json({msg: "new conversation added"});
        }
    }catch(err){
        res.status(500).json({msg: `${err}`});
    }
})


app.get('/',connect,async (req:Request,res:Response)=>{
    try{
        const payload = await conversationmodel.findOne({members: {$all:[req.body.senderid,req.body.reciverid]}});
        res.status(200).json({msg: payload});
    }catch(err){
        res.status(500).json({msg: `${err}`});
    }
})

export default app;