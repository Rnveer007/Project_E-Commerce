import express from "express";
import { count, loginAdmin, logOutAdmin } from "../controller/admin.js"
import { checkAdmin } from "../middleware/auth.js"


const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);

adminRouter.post("/logout", logOutAdmin);

adminRouter.get("/check", checkAdmin, (req, res) => {
    res.send({ message: "admin athaunticated" })
});
adminRouter.get("/count", count);
export default adminRouter;