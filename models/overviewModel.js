const mongoose = require("mongoose");

const overviewSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique: true
    },
    monthlyIncome:{
        type: String,
        require: true
    },
    monthlyExpense:{
        type: String,
        required: true
    },
    weeklyIncome:{
        type: String,
        required: true
    },
    weeklyExpense:{
        type: String,
        required: true
    },
    yearlyIncome:{
        type: String,
        required: true
    },
    yearlyExpense:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model("overview",overviewSchema);