var express = require("express");
var router = express.Router();

const { check, validationResult } = require("express-validator");

//writting contoller:
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

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

router.post(
  "/signin",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password field is required").isLength({ min: 1 }),
  ],
  signin
);

router.get("/signout", signout);

/*
router.get("/testroute", isSignedIn, (req, res) => {
  res.send("A protected route!");
});
*/

module.exports = router;
