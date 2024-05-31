const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const sequelize = require("./config/database");

const authRoutes = require("./routes/authenticationRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const User = require("./models/users");
const Expense = require("./models/expense");

const PORT = 3001;

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(authRoutes);
app.use("/expense", expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  .sync()
  .then(
    app.listen(PORT, () => {
      console.log(`Server is runnig on port :- ${PORT}`);
    })
  )
  .catch((err) => console.log(err));
