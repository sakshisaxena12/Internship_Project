require("dotenv").config();
const mongoose = require("mongoose");
//express is req. to listen on port.
const express = require("express");
const app = express();

//can put atlas link here too or mongodb://localhost:27017/tshirt will also work fine.
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, //keep connection alive
  })
  .then(() => {
    console.log("DB CONNECTED"); //for seeing if db is working fine and keep connection chaining.
  });


  //USING MIDDLEWARE:
app.use();

const port = process.env.PORT || 3000; //either 3000 or any other port
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

//.env does not get uploaded on githhub/repo server so its safe to write the database string this way. and use dotenv module.
