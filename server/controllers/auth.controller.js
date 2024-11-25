const bcrypt = require("bcryptjs");
const User = require('../models/user.model');

const signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        const salt = await bcrypt.genSalt(8);
        password = await bcrypt.hash(password, salt);

        const newUser = await User.create({username, email, password});

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



module.exports = {
    signup
}
