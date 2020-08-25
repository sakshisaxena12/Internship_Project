var express = require("express");
var router = express.Router();

const { check, validationResult } = require("express-validator");

//writting contoller:
const { signout, signup } = require("../controllers/auth");

//fn coming from auth controllers:

router.post(
  "/signup",
  [
    check("name", "Name should be atleast 3 char").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be atleast 3 char").isLength({ min: 3 }),
  ],
  signup
); //from auth controller.

router.get("/signout", signout);

module.exports = router;
