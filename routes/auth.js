import express from "express";
const router = express.Router();

import { loginUser, logoutUser, signupUser } from "../controllers/auth.js";

router.post("/signup", signupUser)

router.post("/login", loginUser)

router.post("/logout", logoutUser)



export default router;