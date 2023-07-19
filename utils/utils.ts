const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const utils = {
  validateStrongPassword: (password: string) => {
    let res = false;
    if (password.length >= 8) {
      res = true;
    }
    return res;
  },
  isValidEmail: (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  },
  hashPassword: (password: string) => {
    return bcrypt.hash(password, 10);
  },
  comparePassword: (password: string, hashPassword: string) => {
    return bcrypt.compare(password, hashPassword);
  },

  generateToken: (id: string, email: string) => {
    const token = jwt.sign({ id: id, email: email }, process.env.SECRETKEYS, {
      expiresIn: "1h",
    });
    return token;
  },
  decodeToken: (token: string) => {
    return jwt.decode(token);
  },
  expiresIn: (token: string) => {
    return Math.floor(utils.decodeToken(token).exp - Date.now() / 1000) / 3600;
  },
  mobileNumberIndonesia: (mobileNumber: string) => {
    const regex = /^(?:\+62|0)(?:\d{3,4}-?){2}\d{4}$/;
    let res = false;
    if (regex.test(mobileNumber)) {
      res = true;
    }
    return res;
  },
};

export default utils;
