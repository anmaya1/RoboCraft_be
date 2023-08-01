const express = require("express");
const collection = require("../models/signupschema");
const Razorpay = require("razorpay");
const KEY_ID='rzp_test_JvtA1mvfRJJoZn';
const KEY_SECRET='OVPxh8Uz8gAJS4p9tpO9xJ3O';
var crypto = require("crypto");


const signup = async (req, res) => {
  try {
    const { name, email, number, designation,  city, date } = req.body;
    if (
      !name ||
      !email ||
      !number ||
      !designation ||
      !city ||
      !date
    ) {
      res.json({ message: "all fields are nessasory" });
      throw new Error("error");
    }

    const foundemail = await collection.findOne({ email });
    if (foundemail) {
      res.json({ message: "you have already registered with this email" });
      res.send(400);
      throw new Error("error");
    }

    const user = collection.create({
      name,
      email,
      number,
      designation,
      city,
      date,
    });
    
    if (user) {
      res.json({ message: "user is created" });
      console.log("user is creted");
    } else {
      res.json({ message: "user is not created" });
    }
  } catch (e) {
    console.log("error has occured", e);
  }
};



const admin = async (req, res) => {

  try {

    const display = await collection.find();
    res.status(200);
    res.send(display);
    
  } 
  catch (err) {

    res.status(400);
    res.send("error ", err);
    console.log("error", err);

  }
};




const order = async (req, res) => {

  let instance = new Razorpay({
    key_id: KEY_ID,
    key_secret: KEY_SECRET,
  });

  var options = {
    amount: req.body.amount * 100 , // amount in the smallest currency unit
    currency: "INR",
    
  };
  instance.orders.create(options, function (err, order) {
    if(err){
        return res.send("server error")
    }
    else{
        return res.send({code:200 ,message:"order created", data : order})
    }
  });


};



const verify = async (req, res) => {
    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    var expectedSignature = crypto.createHmac('sha256', KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === req.body.response.razorpay_signature) {
        res.send({ code: 200, message: 'Sign Valid' });
    } else {

        res.send({ code: 500, message: 'Sign Invalid' });
    }
};

module.exports = { signup, admin,order,verify};