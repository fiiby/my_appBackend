const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoute= require("./routes/userRoute");



dotenv.config();
require('./helpers/init_mongodb');

app.use(express.json());

app.use("/api/user", userRoute);


app.listen(process.env.PORT|| 5000, function(){
    console.log("hey, server is running! Now listening for requests on http://localhost:5000");
  });