const jwt = require('jsonwebtoken');


const generateAccessToken = (payload, time) => {
  const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: time,
  });

  return access_token;
};

module.exports = {
  generateAccessToken
}