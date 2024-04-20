import mongoose from "mongoose";
import {config} from "dotenv";
import { NextFunction } from "express";

config();
const connectionstring = process.env.CONNECTIONSTIRNG as string;

const connect = async (next:NextFunction)=>{
    try{
        await mongoose.connect(connectionstring);
    }catch(err){
        console.error(err);
    }
    next();
}

export default connect;
