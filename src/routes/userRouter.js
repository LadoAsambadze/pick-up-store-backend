import express from "express";
const userRouter = express.Router();

import { Login, Singup, Profile } from "../controllers/userController.js";

userRouter.post("/login", Login);
userRouter.post("/singup", Singup);
userRouter.get("/profile", Profile);

export default userRouter;
