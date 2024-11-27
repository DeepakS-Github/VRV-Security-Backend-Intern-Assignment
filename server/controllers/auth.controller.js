const bcrypt = require("bcryptjs");
const User = require('../models/user.model');
const { generateAccessToken } = require("../utils/token.utils");
const { isStrongPassword, isValidEmail } = require("../utils/validation.utils");


/**
 * Handles user registration by validating inputs, hashing the password,
 * and creating a new user in the database.
 * Responds with appropriate error or success messages.
 */

const signup = async (req, res) => {
    try {
        let { username, email, password, confirmPassword } = req.body;

        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!isStrongPassword(password)) {
            return res.status(400).json({ message: "Password must be follow the validation criteria" });
        }

        if (password != confirmPassword) {
            return res.status(400).json({ message: "Password and Confirm Password do not match" })
        }

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
            }
        }

        console.log(error);
        res.status(500).send({ message: "Something went wrong!" });
    }
};



/**
 * Handles user login by verifying the email and password.
 * Generates and returns a JWT token upon successful authentication.
 */

const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: "User with this email not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid password" });
        }

        let token;
        if (user.role === "User") {
            token = generateAccessToken({ id: user._id, role: user.role }, "24h");
        }
        else {
            token = generateAccessToken({ id: user._id, role: user.role }, "1h");
        }


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
