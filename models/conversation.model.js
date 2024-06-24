import mongoose from "mongoose";

const conversationMessage = new mongoose.Schema({
    participants : [ // katilan kisilerin id lerini saklar (dizi)
        {
            type : mongoose.Schema.Types.ObjectId, // turu mongo nun kendi otomatik olarak verdigi _id dir 
            ref : "User" // User modelini referans alir
        }
    ],
    messages : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Message",
            default : []
        }
    ]
}, {timestamps : true})

const Conversation = mongoose.model("Conversation", conversationMessage)
export default Conversation;