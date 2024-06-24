import User from "../models/user.model.js";

export const getUsersSideBar = async(req, res) => {
    try{

        const loggedInUserId = req.user._id; //protectRoute dan dolayi req ten alabiliyoruz

        const filteredUsers = await User.find({_id : {$ne : loggedInUserId}}).select("-password") ;// giris yapan haric diger butun users lari gosterir

        res.status(200).json({filteredUsers})

    }catch(error){
        console.log("Error in getUsersSideBar",error.message)
        res.status(500).json({error: "Internal server error"})
    }
}