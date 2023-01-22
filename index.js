const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const BlogRoute = require('./Routes/BlogRoute')


const { default: mongoose } = require('mongoose');
const PORT = process.env.PORT || 5000;
const app = express();

const corsFonfig = {
    origin: true,
    credentials: true,
}

app.use(cors(corsFonfig));
app.options('*', cors(corsFonfig));
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.DATABASE_LOCAL,
    {
        useNewUrlParser: true,
        autoIndex: true
    }).then(() => console.log("Database connected successfully"))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Routes
app.get("/", (req, res) => res.send("Blog site server is running..."))
app.use('/api/v1/blog', BlogRoute);

//All
app.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
})

process.on('uncaughtException', err => {
    console.log(err);
    app.close(() => {
        process.exit(1);
    })
})

