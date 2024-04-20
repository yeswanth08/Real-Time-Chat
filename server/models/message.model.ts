//high level -> messages model

import mongoose, { Types} from "mongoose";
import connect from "./db";

connect();

const messagesschema = new mongoose.Schema({
    conversationid:{
        type: Types.ObjectId,
    },
    senderid:{
        type: Types.ObjectId,
    },
    reciverid: {
        type: Types.ObjectId,
    },
    message:{
        type: String,
    },
},{
    timestamps: true
});

const messagemodel = mongoose.model('messages',messagesschema);

export default messagemodel;