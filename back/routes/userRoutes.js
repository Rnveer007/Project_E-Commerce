import express from "express";
import { registerUser, loginUser } from "../controller/user.js"


userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser)

export default userRouter