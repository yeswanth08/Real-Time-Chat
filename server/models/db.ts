import mongoose from "mongoose";
import {config} from "dotenv";

config();
const connectionstring = process.env.CONNECTIONSTRING as string;

const connect = async ()=>{
    try{
        await mongoose.connect(connectionstring);
        console.log("data-base is connected");
    }catch(err){
        console.error(err);
        throw err;
    }
}

export default connect;
