const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    id: Number,
    value: String,
    isCompleted: Boolean
});

module.exports = mongoose.model("todos", todoSchema);