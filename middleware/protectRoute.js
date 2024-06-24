import jwt from "jsonwebtoken"
import User from "../models/user.model.js";


const protectRoute = async(req, res ,next) => {
    try{
        const token = req.cookies.jwt; // kullanici signup ya da login islemi yaptiysa token ni cookie den aliriz

        if(!token){
            return res.status(401).json({error : "Unauthorized - No token provided!"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) //eger token varsa,  token i secret key e gore kontrol eder 
        // secret key e gore kontrolden sonra generateToken fonksiyonundan dolayi, user a ait tokendir 
        if(!decoded){ // token dogrulamasi yanlis ise 
            return res.status(401).json({error : "Unauthorized - Invalid Token!"})
        }

        const user = await User.findById(decoded.userId).select("-password"); // idye gore db de user i buluruz -- userId yazmak zorunda miyim bakalim
                                                                            // passwordu almayiz
        if(!user){
            return res.status(400).json({error : "User not found!"})
        }

        req.user = user; // en son olarak clienttan gelen user ile db deki user aynidir
        next();// bir sonraki sendMessage islemine gecebilir


    }catch(error){
        console.log("Error in protectRoute middleware: ", error.message)
        res.status(500).json({error : "Internal server error"})
    }
}

export default protectRoute;