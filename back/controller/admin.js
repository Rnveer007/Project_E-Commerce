import bcrypt from "bcrypt"
import "dotenv/config"
import jwt from "jsonwebtoken"
import Admin from "../models/adminModel.js";

export async function loginAdmin(req, res) {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).send({ message: "Email not found" });

        const passwordMatches = await bcrypt.compare(password, admin.password);

        if (!passwordMatches) return res.status(401).send({ message: "Invalid email or password" });

        // create token & send it back to clint  as cookies

        // res.send({ message: "User login", user: user });

        const adminToken = jwt.sign(
            {
                id: admin._id, email: admin.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )
        // console.log("adminToken", adminToken)

        res.cookie("adminToken", adminToken, {
            httpOnly: false,
            secure: false,
            sameSite: "strict",
            maxAge: 36000000,
        }).send({ message: "Login Successful", admin: admin })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "User not login", errorString: error.message });
    }
}

export async function logOutAdmin(req, res) {
    try {
        res.clearCookie("adminToken", {
            httpOnly: false,
            secure: false,
            sameSite: "strict",
        })
        res.status(200).send({ message: "Admin Logged out" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ mesage: error.message })
    }

}

export async function count(req, res) {
    const count = { categories: 0, orders: 0, products: 0, users: 0 };
    try {
        count.categories = await categoryModel.countDocuments();
        count.products = await Product.countDocuments();
        // const orderCount = await Order.countDocuments();
        // const userCount = await User.countDocuments();

        return res.send({ count });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Unable to count numbers", errorString: error.message });
    }
}




