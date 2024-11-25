const User = require('../models/user.model');

const getProfile = async (req, res) => {
    try {
        console.log(req.user);
        const user = await User.findById(req.user.id).select("-password");
        console.log(user);
        res.status(200).send(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    getProfile
}
