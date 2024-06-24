import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRoutes from "./routes/auth.js" // router i bagladik
import messageRoutes from "./routes/message.js"
import userRoutes from "./routes/userRoute.js"
import connectMongoDB from "./db/connectToMongoDB.js" // db yi bagladik


const app = express();
const PORT = process.env.PORT || 5555;

dotenv.config();

app.use(cors())
app.use(express.json())//from request body
app.use(cookieParser())// cookie kullanimina izin verir

// app.get("/" , (req,res) => {
//     res.send("welcome homepage")
// })

app.use("/api/auth", authRoutes); // router kullandik
app.use("/api/messages", messageRoutes); //api/messages/send/:id ye post yapilir
app.use("/api/users", userRoutes)


app.listen(PORT, () => {
    connectMongoDB()
    console.log("server running on port",PORT)
})


