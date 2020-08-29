const User = require("../models/user"); //bring model here since save users to db.
const { check, validationResult } = require("express-validator");
//const user = require("../models/user");
//going to routes-auth.js:

var jwt = require("jsonwebtoken");
var expressjwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req); //populated erros.
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body); //obj --> coming from User -->coming from moongose so we can use all methods of mongoose here.
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB",
      });
    }

    res.json({
      //throw these details,
      name: user.name,
      email: user.email,
      id: user._id,
    });
  }); //save user in db with an ans back.

  /*console.log("REQ BODY", req.body);
  res.json({
    message: "SIGNUP ROUTE WORKS!",
  }); */
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body; //destructing
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email doesnot exists in the database",
      }); //when error.
    }

    if (!user.autheticate(password)) {
      //if password match fails.
      return res.status(401).json({
        error: "Email and password do not match!",
      }); //exactly one match very first one.
    }

    //create token:
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie:
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to frontend:
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "USER SIGNOUT SUCCESFULLY!",
  });
};

//protected routes:
//here we are not using next because we are using express-jwt that contains mainy fn itself.
exports.isSignedIn = expressjwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//coustom middlewares:
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id === req.auth._id; //if user is loggedin.
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    res.status(403).json({
      error: "You are not Admin. ACCESS DENIED",
    });
  }
  next();
};
