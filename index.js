const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors =require('cors');
const userRoute= require("./routes/userRoute");



dotenv.config();
require('./helpers/init_mongodb');

app.use(express.json());

app.use(cors({   // cors the connecter b/w client/server.
  origin:"http://localhost:5173",
}))


app.use("/api/user", userRoute);


app.listen(process.env.PORT|| 3000, function(){
    console.log("hey, server is running! Now listening for requests on http://localhost:3000");
  });