// high level --> conversation model

import mongoose from "mongoose";

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

