const mongoose = require("mongoose");

//pulls out objId:
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      //this will be ref to cateory schema already created.
      type: ObjectId,
      ref: "Category", //from category schema.
      required: true,
    },
    stock: {
      //no.  of units have.
      type: Number,
    },
    sold: {
      //no.  of units soldout.
      type: Number,
      default: 0, //since nothing is sold in starting
    },
    photos: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true } //when new entery records time and store in db.
);

module.exports = mongoose.model("Product", productSchema);
