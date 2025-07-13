const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const UserRoutes = require("./routes/UserRoutes")
dotenv.config();

const app = express();
connectDB();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api", UserRoutes)

app.listen(process.env.PORT, () => {
    console.log(`server is running`);

})