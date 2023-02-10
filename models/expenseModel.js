const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique: true
    },
    expense:{
        type: String,
        require: true
    },
    expenseIn:{
        type: String,
        required: true
    },
    expenseFor:{
        type: String,
        required: true
    },
    month:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("expense",expenseSchema);