import express from "express"
import protectRoute from "../middleware/protectRoute.js";
import {getUsersSideBar} from "../controllers/getUsersSideBar.js"

const router = express.Router();

router.get("/", protectRoute, getUsersSideBar)


export default router;