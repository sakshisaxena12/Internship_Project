//Creating a server:

const express = require("express");

const app = express(); //call express

const port = 3000;
//can be any port number.

//ADMIN ROUTE:
const admin = (req, res) => {
  return res.send("Admin is here!");
};

//CUSTOME MIDDLEWARE isAdmin:

const isAdmin = (req, res, next) => {
  console.log("isAdmin is running...");
  next();
};

const isloggedin = (req, res, next) => {
  console.log("isloggedin...");
  next();
};

app.get("/admin", isloggedin, isAdmin, admin);

/*
//THIS IS A CALLBACK:
app.get("/admin", (req, res) => {
  return res.send("Admin here!");
});
*/

//Request Callbacks:

//LOGIN ROUTE:
app.get("/signup", (req, res) => {
  return res.send("You are visiting signup route!");
});

//SIGNED OUT:
app.get("/signout", (req, res) => {
  return res.send("you are signout!");
});

//LOGIN ROUTE:
app.get("/login", (req, res) => {
  return res.send("You are visiting login route!");
});

//HOME:
app.get("/", (req, res) => {
  return res.send("HOME PAGE(ROOT)!");
});

//myname:
app.get("/sakshi", (req, res) => {
  return res.send("Sakshi here..!");
});

app.listen(port, () => {
  console.log("server is up and running...");
});
