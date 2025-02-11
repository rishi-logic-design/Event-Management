const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");


const connectDB = require("./Db/db");

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", require("./Routes/AuthRouter"));
app.use("/event", require("./Routes/EventRouter"));


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


connectDB();