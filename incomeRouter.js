const express = require("express");
const router = express.Router();
const incomeModule = require("./modules/incomeModule");
const auth = require("./modules/authModule");

router.get("/get",incomeModule.getIncome);

router.put("/update/:id",auth.authorizeUser, incomeModule.updateIncome);

router.post("/create" ,auth.authorizeUser, incomeModule.createIncome);

router.delete("/delete/:id" ,auth.authorizeUser, incomeModule.deleteIncome);

module.exports = router;