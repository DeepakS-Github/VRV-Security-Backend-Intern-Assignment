const User = require('../models/user.model');


/**
 * Retrieves the profile of the currently logged-in user by their ID.
 * Excludes the password field in the response.
 */
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).send({message: "Your details successfully fetched", user});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong!" });
    }
};



/**
 * Retrieves the profiles of all users with the role "User".
 * Excludes the password and __v fields in the response.
 */
const getAllProfile = async (req, res) => {
    try {
        const allUsers = await User.find({role: "User"}).select("-password -__v");
        res.status(200).send({ message: "All users successfully fetched", users: allUsers });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong!" });
    }
}

/**
 * Deletes a user profile by their ID provided in the request parameters.
 * Responds with an error if the user does not exist.
 */
const deleteProfile = async (req, res) => {
    const { userId } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send({ message: "User not found!" });
        }
        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong!" });
    }
}



module.exports = {
    getProfile,
    getAllProfile,
    deleteProfile
}
