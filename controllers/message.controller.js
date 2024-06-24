import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";


//SEND MESSAGES
export const sendMessage = async(req, res) => {
    try{
        const {message} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants : {$all : [senderId, receiverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId : senderId, 
            receiverId : receiverId,
            message : message
        })

        if(newMessage){
            conversation.messages.push(newMessage.id)
        }

        // SOCKWT.IO FUNCTIONALITY


        await newMessage.save();
        await conversation.save()

        res.status(201).json({message : "Message sent succesfully"})

    }catch(error){
        console.log("Error in sendMessage controller:",error.message)
        return res.status(500).json({error : "Internal Server error"})
    }
}
//GET MESSAGES 
export const getMessages = async(req, res) => {
    try{
        const userToChatId = req.params.id;
        const senderId = req.user._id;
        
        const conversation = await Conversation.findOne({
            participants : {$all : [senderId, userToChatId]}
        }).populate("messages") // sadece message array ini vermez array icindeki mesajlari verir

        if(!conversation){
            return res.status(200).json([])
        }

        res.status(200).json(conversation.messages)


    }catch(error){
        console.log("Error in getMessage controller:", error.message)
        return res.status(500).json({error : "Internal Server error"})

    }
}