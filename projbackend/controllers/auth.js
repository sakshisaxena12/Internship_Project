const User = require("../models/user"); //bring model here since save users to db.
const { check, validationResult } = require("express-validator");

//going to routes-auth.js:

exports.signup = (req, res) => {

  const 


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

exports.signout = (req, res) => {
  res.json({
    message: "USER SIGNOUT",
  });
};
