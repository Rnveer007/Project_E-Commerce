import express from "express";
import { loginAdmin } from "../controller/admin.js"
import { checkAdmin } from "../middleware/auth.js"

//import checkadmin

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);

adminRouter.post("/logout", async (req, res) => {
    try {
        res.clearCookie("adminToken", {
            httpOnly: false,
            secure: false,
            sameSite: "strict",
        })
        res.status(200).send({ message: "Logged out" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ mesage: error.message })
    }
});
adminRouter.get("/check", checkAdmin, (req, res) => { res.send({ message: "admin athaunticated" }) });


export default adminRouter;