const mongoose = require('mongoose');

const toDoListSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }


})


const ToDoList = mongoose.model('ToDoList', toDoListSchema);

module.exports = ToDoList;