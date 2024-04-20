// high level --> conversation model

import mongoose from "mongoose";
import connect from "./db";

connect();

const conversationschema = new mongoose.Schema({
    members:{
        type: Array,
    },
    messages:{
        types: String,
    }
},{
    timestamps: true
})

const conversationmodel = mongoose.model('conversations',conversationschema);

export default conversationmodel;

