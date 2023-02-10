const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const db = require("./db/connect");
db();

//import routes

const incomeRouter = require("./routes/incomeRouter");
const expenseRouter = require("./routes/expenseRouter");
const overviewRouter = require("./routes/overviewRouter");
const registerRouter = require('./routes/registerRouter');
const auth = require("./models/authModel");

app.get("/", (req,res) => {
    res.send("Welcome to My App!!!");
});

app.use("/moneyManager",registerRouter);
app.use("/", auth.authenticateUser);
app.use("/income", incomeRouter);
app.use("/expense", expenseRouter);
app.use("/overview", overviewRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`App is running on the PORT ${process.env.PORT}`);
});

// CORS -> Cross Origin Resource Sharing