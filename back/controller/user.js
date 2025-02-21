import bcrypt from "bcrypt"
import User from "../models/userModels.js";

export async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
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
        if (!passwordMatches) return res.status(404).send({ message: "Invalid Crendentials" });

        res.send({ message: "User login", user: user });
    } catch (error) {
        return res.status(500).send({ message: "User not login", errorString: error.message });
    }
}