import mongoose from "mongoose";
import {config} from "dotenv";

config();
const connectionstring = process.env.CONNECTIONSTIRNG as string;

mongoose.connect(connectionstring);

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


const usermodel = mongoose.model('user',userschema);

export default usermodel;

