import express from "express"
import { check } from '../middleware/auth.js'
// const authRouter = express.Router()
// authRouter.get("/check", (req, res) => {
//   console.log("cookies", req.cookies)
// })

const authRouter = express.Router();

authRouter.get("/check", check, (req, res) => {
  res.send({
    message: "User Authentication"
  })
})

authRouter.post("/logout", async (req, res) => {
  try {
    res.clearCookie("LoginToken", {
      httpOnly: false,
      secure: false,
      sameSite: "strict",
    })
    res.status(200).send({ message: "Logged out" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({mesage: error.message})
  }
})

export default authRouter