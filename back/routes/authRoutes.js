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
    res.clearCookie("loginToken", {
      httpOnly: false,
      secure: false,
      sameSite: "strict",
    })
    res.status(500).send({ error: error.message });
  } catch (error) {
  }
})

export default authRouter