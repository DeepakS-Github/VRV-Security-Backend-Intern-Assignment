const jwt = require('jsonwebtoken');


const generateAccessToken = (type, id) => {
    const access_token = jwt.sign({ [type]: id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  
    return access_token;
};

module.exports = {
    generateAccessToken
}