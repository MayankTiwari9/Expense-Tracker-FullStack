const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const sequelize = require("./config/database");

const authRoutes = require("./routes/authenticationRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const paymentRoutes = require('./routes/purchaseRoutes');

const User = require("./models/users");
const Expense = require("./models/expense");
const Order = require("./models/order");

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
app.use('/purchase', paymentRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
  .sync(
    {force: true}
  )
  .then(
    app.listen(PORT, () => {
      console.log(`Server is runnig on port :- ${PORT}`);
    })
  )
  .catch((err) => console.log(err));
