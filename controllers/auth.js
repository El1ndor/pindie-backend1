const jwt = require("jsonwebtoken");
const path = require("path");
const user = require("../models/user.js");

const login = (req, res) => {
  const { email, password } = req.body;
console.log(email, password)
  user
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
      expiresIn: 3600
    });
    return { user, token };
    })
    .then(({ user, token }) => {
      res
        .status(200)
        .send({
            _id: user._id, 
            username: user.username, 
            email: user.email, 
            jwt: token });
          })
    .catch(error => {
      console.log(error)
      res.status(401).send({ message: error.message });
    });
};

const sendDashboard = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin/dashboard.html"));
}; 

const sendIndex = (req, res) => {
  if (req.cookies.jwt) {
    try {
      jwt.verify(req.cookies.jwt, "some-secret-key");
      return res.redirect("/admin/dashboard");
    } catch (err) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    }
  }
  res.sendFile(path.join(__dirname, "../public/index.html"));
}; 

const checkCookiesJWT = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.redirect("/");
  }
  req.headers.authorization = `Bearer ${req.cookies.jwt}`;
  next();
};



  module.exports = { login, sendIndex, sendDashboard, checkCookiesJWT};