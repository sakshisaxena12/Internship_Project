//importing mongoose:
var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

//creating a schema:
var userSchema = new mongoose.Schema(
  {
    //Required the fields:

    name: {
      type: String,
      required: true, //always required
      maxlength: 32, //max length of name that can be given
      trim: true, //removes spaces or tabs
    },

    lastname: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true, //checks for a unique email each time.
    },

    //some info:
    userinfo: {
      type: String,
      trim: true,
    },

    //encry password(uuid,crypto) not normal text:
    encry_password: {
      type: String,
      required: true,
    },

    salt: String, //salt:hashed values or number generate, store data in hashed value and salt decryptes it.

    //type of users: admin, users:
    role: {
      type: Number,
      default: 0, //privileges:: 0 for user, 1 for admin....
    },

    //if users purchase anything:
    purchases: {
      type: Array, //item id here
      default: [], //what is bought
    },
  },
  { timestamps: true } //so that we can use filters on it & record the time of creation.
);

//virtual: set and get these fields back.
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password; //pvt variable in js
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

//since encry_passwd is req field so if thats empty then will return err.
userSchema.methods = {
  //this fn will match these hashed values:
  autheticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password; //if match returns true/false.
  },

  //this fn will be returning taking the plainpassword and returning the secured password.
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return ""; //empty password wont be stored this way.
    }
  },
};

//using schema we created:
module.exports = mongoose.model("User", userSchema);
