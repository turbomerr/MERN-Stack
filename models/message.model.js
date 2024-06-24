import mongoose from "mongoose";

// Message schema si olusturduk

const messageSchema = new mongoose.Schema({
    senderId : {//Mesajı gönderen kullanıcının kimliğini (ID) saklar.
        type : mongoose.Schema.Types.ObjectId,
        ref : "User", //Mongoose'da bir şema tanımlarken ref özelliği, bir alanın başka bir modelle olan ilişkisini belirtmek için kullanılır. Bu, MongoDB'de referans (foreign key) ilişkileri oluşturmanın bir yoludur.
        required : true
    },
    receiverId : { //Mesajı alan kullanıcının kimliğini (ID) saklar
        type : mongoose.Schema.Types.ObjectId, //
        ref : "User", // referans 
        required : true
    },
    message : {
        type : String,
        required : true
    },
}, {timestamps : true});

const Message = mongoose.model("Message", messageSchema)
export default Message; 