const express = require("express");
const app = express();
const axios = require("axios");
const PATH = require("./PATH");

// Mongo version
const todoMongoRouter = require("./routes/todosMongo");

//JSON version
const todoRouter = require("./routes/todos");


app.use("/todos", todoMongoRouter); 


const newTodoItem = {
  id: 100500,
  value: "Do this",
  isCompleted: false,
};

const changedTodoItem = {
  id: 100500,
  value: "No, do that",
  isCompleted: false,
};


function tryPost() {
  axios
    .post(PATH, newTodoItem)
    .then((res) => console.log("Added new thing"))
    .catch((err) => console.log(err));
}
tryPost();

function tryPut(id) {
  axios
    .put(`${PATH}${id}`, changedTodoItem)
    .then((res) => console.log(`Changed that thing ID ${id}`))
    .catch((err) => console.log(err));
}
tryPut(100500)

function tryDelete(id) {
  axios
    .delete(`${PATH}${id}`)
    .then((res) => console.log(`Deleted that thing ID ${id}`))
    .catch((err) => console.log(err));
}
tryDelete(100500)

app.listen(3000);
