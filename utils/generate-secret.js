const crypto = require("crypto");

const generateRandomSecret = () => {
  const buffer = crypto.randomBytes(48);
  const token = buffer.toString("hex");
  return token;
};

module.exports = generateRandomSecret;
