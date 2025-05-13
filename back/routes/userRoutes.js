import express from "express";
import { registerUser, loginUser, logOutUser } from "../controller/user.js"
import { checkUser } from "../middleware/auth.js";

const userRouter = express.Router()

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", logOutUser);

userRouter.get("/check", checkUser, (req, res) => {
    res.send({
        message: "User Authentication"
    })
})

export default userRouter