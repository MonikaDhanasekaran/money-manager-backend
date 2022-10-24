const express = require('express');
const mongo = require('./connect');
const incomeRouter = require("./incomeRouter");
const expenseRouter = require("./expenseRouter");
const overviewRouter = require("./overviewRouter");
const registerRouter = require('./registerRouter');
const auth = require("./modules/authModule");
const cors = require("cors");

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());

// to parse req.body, to send from client to express framework we are using this middleware

app.use(express.json());

mongo.connect();

app.use('/user', registerRouter);

app.use('/',auth.authenticateUser);

app.use("/income",incomeRouter);

app.use("/expense",expenseRouter);

app.use("/overview",overviewRouter);

app.listen(process.env.PORT);

// CORS -> Cross Origin Resource Sharing