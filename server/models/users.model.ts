import mongoose from "mongoose";
import connect from "./db";

connect();

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

