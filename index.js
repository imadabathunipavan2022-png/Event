const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/event");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "working"
    });
});

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    next();
});

app.use("/event", eventRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "page not found"
    });
});

app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
});