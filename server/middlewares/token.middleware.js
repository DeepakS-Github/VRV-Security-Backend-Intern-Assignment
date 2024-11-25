const jwt = require("jsonwebtoken");

const verifyAccessToken = async (req, res, next) => {
    let access_token = req.headers.authorization;

    if (!access_token) {
        return res.status(401).send({ message: "Access token is required" });
    }

    if (!access_token.startsWith("Bearer ")) {
        return res.status(400).send({ message: "Invalid token format" });
    }

    access_token = access_token.split(" ")[1];

    try {
        const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {

        if (error.name === "TokenExpiredError") {
            return res
                .status(403)
                .send({ message: "Token expired, please login again" });
        }

        if (error.name === "JsonWebTokenError") {
            return res
                .status(403)
                .send({ message: "Invalid token, please login again" });
        }

        console.error("Token verification error:", error);
        return res.status(500).send({ message: "Authentication failed" });
    }
};

module.exports = verifyAccessToken;
