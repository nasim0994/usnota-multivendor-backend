const jwt = require("jsonwebtoken");

exports.createJsonWebToken = (payload, expiresIn) => {
  if (!payload || typeof payload !== "object") {
    throw new Error("Payload must be a non-empty object");
  }

  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn,
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
