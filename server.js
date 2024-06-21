const express = require("express");
const app = express();
const axios = require("axios");
const PATH = require("./PATH");

// Mongo version
const todoMongoRouter = require("./routes/todosMongo");

//JSON version
const todoRouter = require("./routes/todos");


app.use("/todos", todoMongoRouter); 

app.listen(3000);
