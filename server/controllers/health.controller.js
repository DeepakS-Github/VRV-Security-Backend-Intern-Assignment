const healthCheck = (req, res) => {
    res.status(200).send("Server is working perfectly");
}

module.exports = {
    healthCheck
}