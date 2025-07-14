const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const UserRoutes = require("./routes/UserRoutes")
dotenv.config();

const app = express();
const allowedOrigin = [
    "http://localhost:5173",
    "https://leaderboard-mhvats.onrender.com"
]
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigin.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}));
connectDB();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", UserRoutes)

app.listen(process.env.PORT, () => {
    console.log(`server is running`);

})