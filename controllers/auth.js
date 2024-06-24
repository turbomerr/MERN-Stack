import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndCookie from "../utils/generateToken.js"

export const signupUser = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body; // req.body den verileri aliriz

        if (password !== confirmPassword) { // pass dont match
            return res.status(400).json({ message: "Password dont match!" })
        }
        const user = await User.findOne({ username }); // if user exist => error "user already exist"

        if (user) {
            return res.status(400).json({ error: "User already exist" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt); // PASSWORD HASHED

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({ // DB de yeni bir user olusturduk 
            fullName: fullName,
            username: username,
            password: hashedPassword,
            gender: gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfPic // dependant gender
        });

        if (newUser) {
            //generate token here
            generateTokenAndCookie(newUser._id, res)// token olusturulur, cookie olarak saklanir
            await newUser.save();

            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                password: newUser.password,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            })
        }
        else {
            return res.status(400).json({ error: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in Signup Controller ", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
export const loginUser = async(req, res) => {
    try{
        const {username , password } = req.body; // client tan user bilgileri
        
        const user = await User.findOne({username});// daha once bir user olup olmadigini kontrol eder cunku username uniqie dir

        if(!user){ // user not exist 
            return res.status(400).json({message : "User not found.."});
        }
        
        const isSuccess = await bcrypt.compare(password, user?.password || ""); // bu kontrolu yapmazsak hata aliriz

        if(!isSuccess){ // if not success
            return res.status(400).json({message : "Password is not correct, please try again!"});
        }
        generateTokenAndCookie(user._id, res); // token olusturuyoruz
        res.status(201).json({user : user.username, fullname : user.fullName , message : "Succesfull!"})
        


    }catch(error){
        console.log(error)
        return res.status(500).json({error : "Internal Server Error"})
    }
}

export const logoutUser = async(req, res) => {
    try{
        res.cookie("jwt", "", {maxAge : 0})
        res.status(200).json({message : "Logged out succesfully!"})
        
    }catch(error){
        console.log(error)
        return res.status(500).json({error : "Internal Server Error"})
    }
}
