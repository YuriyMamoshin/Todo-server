const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Todo = require("../Todo");
const cors = require("cors");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors());

async function connect() {
  await mongoose.connect("mongodb://127.0.0.1:27017/todoApp");
}

connect().then(() => console.log("successfully connected")).catch((err) => console.log(err));


router.get("/", (req, res) => {
  async function getTodos() {
    const allTodos = await Todo.find({}, {_id: 0, __v: 0}); 
    res.send(allTodos);
  }
  getTodos();
});

router.post("/", (req, res) => {

  async function addTodo() {
    const newTodo = await Todo.create(req.body); 
    res.send(newTodo);
  }
  addTodo();
});

router.delete("/", (req, res) => {
  async function deleteAll() {
    const deletedTodos = await Todo.deleteMany({}); 
    res.send(deletedTodos);
  }
  deleteAll();
})

router
  .route("/:id")
  .get((req, res) => {
    async function getTodo() {
      const foundTodo = await Todo.findOne({id: req.params.id}, {_id: 0, __v: 0}); 
      res.send(foundTodo);
    }
    getTodo();
  })
  .put((req, res) => {
    async function updateTodo() {
      const changedTodo = await Todo.updateOne({id: req.params.id}, {$set: req.body}); 
      res.send(changedTodo);
    }
    updateTodo();
  })
  .delete((req, res) => {
    async function deleteTodo() {
      const deletedTodo = await Todo.deleteOne({id: req.params.id}); 
      res.send(deletedTodo);
    }
    deleteTodo();
  });


module.exports = router;
