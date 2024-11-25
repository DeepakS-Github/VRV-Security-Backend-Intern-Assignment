const bcrypt = require("bcryptjs");
const User = require('../models/user.model');
const { generateAccessToken } = require("../utils/token.utils");

const signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        const salt = await bcrypt.genSalt(8);
        password = await bcrypt.hash(password, salt);

        const newUser = await User.create({ username, email, password });

        res.status(200).send({
            message: "User registered successfully"
        })
    } catch (error) {
        if (error.code === 11000) {
            if (error.keyPattern.email) {
                return res.status(400).send({
                    message: "User with this email already exists"
                });
            } else if (error.keyPattern.username) {
                return res.status(400).send({
                    message: "User with this username already exists"
                });
            }
        }

        console.log(error);
        res.status(500).send({ message: "Something went wrong!" });
    }
};



const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: "User with this email not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid password" });
        }

        const token = generateAccessToken({ id: user._id, role: user.role });

        res.status(200).send({ message: "User logged in successfully", token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong!" });
    }
};





module.exports = {
    signup,
    login
}
