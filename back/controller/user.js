import bcrypt from "bcrypt"
import User from "../models/userModels.js";
import jwt from "jsonwebtoken"
import "dotenv/config";


export async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        // console.log(name, email,password);
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword, role: "user" });
        await newUser.save();

        res.status(201).send({ message: "User registered", user: newUser });
    } catch (error) {
        return res.status(500).send({ message: 'User not registered', errorString: error.message });
    }
}

export async function loginUser(req, res) {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).send({ message: "Email not found" });

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) return res.status(401).send({ message: "Invalid email or password" });

        // create token & send it back to clint  as cookies

        const loginToken = jwt.sign(
            {
                id: user._id, email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )
        // console.log("loginToken", loginToken)

        res.cookie("loginToken", loginToken, {
            httpOnly: false,
            secure: false,
            sameSite: "strict",
            maxAge: 36000000,
        }).send({ message: "Login Successful", user: user })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "User not login", errorString: error.message });
    }
}

export async function logOutUser(req, res) {
    try {
        res.clearCookie("loginToken", {
            httpOnly: false,
            secure: false,
            sameSite: "strict",
        })
        res.status(200).send({ message: "User Logged out" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ mesage: error.message })
    }

}