const express = require("express");
const router = express.Router();
const overviewModule = require("./modules/overviewModule");
const auth = require("./modules/authModule");

router.get("/get",overviewModule.getOverview);

router.post("/update" ,auth.authorizeUser, overviewModule.updateOverview);

router.post("/create" ,auth.authorizeUser, overviewModule.createOverview);

module.exports = router;