
// Create at max one admin if not present in database through the environeent admin credentials

const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const createAdmin = async () => {
    try {
        const admin = await User.findOne({ role: "Admin" });   
        if (!admin) {
            console.log("Admin not found, creating one...");

            const { ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
            if (!ADMIN_USERNAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
                throw new Error("Admin credentials not provided");
            }

            const salt = await bcrypt.genSalt(8);
            const password = await bcrypt.hash(ADMIN_PASSWORD, salt);

            await User.create({ username: ADMIN_USERNAME, email: ADMIN_EMAIL, password, role: "Admin" });
            console.log("Admin created successfully");
        }
    }
    catch (error) {
        console.log("Something went wrong! while creating admin", error);
    }
}


createAdmin();
