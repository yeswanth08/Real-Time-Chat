//high level -> messages model

import mongoose, { Types} from "mongoose";


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