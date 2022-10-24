const express = require("express");
const router = express.Router();
const expenseModule = require("./modules/expenseModule");
const auth = require("./modules/authModule");

router.get("/get",expenseModule.getExpense);

router.put("/update/:id",auth.authorizeUser, expenseModule.updateExpense);

router.post("/create" ,auth.authorizeUser, expenseModule.createExpense);

router.delete("/delete/:id" ,auth.authorizeUser, expenseModule.deleteExpense);

module.exports = router;