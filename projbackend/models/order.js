const mongoose = require("mongoose");

//pulls out objId:
const { ObjectId } = mongoose.Schema;

//2 schemas in one file.

//based on product.js:
const ProductCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product", //here.
  },
  name: String,
  count: Number,
  price: Number,
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new mongoose.Schema(
  {
    product: [ProductCartSchema], //prod inside the cart -> this will have other prop. like qty.
    transaction_id: {}, //a boolean value like: on delivery..
    amount: { type: Number },
    address: String,
    updated: Date, //when was the order placed,upadtes on order
    user: {
      //user info: who places the order.
      type: ObjectId,
      ref: "User", //always used with type objid.
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };
