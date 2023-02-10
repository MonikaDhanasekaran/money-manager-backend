const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique: true
    },
    monthlyIncome:{
        type: String,
        require: true
    },
    month:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("income",incomeSchema);