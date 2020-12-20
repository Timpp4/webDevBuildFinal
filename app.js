const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

//hiding secrets from source code
dotenv.config({
    path: "./config.env"
});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect( (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("Database connected.")
    }
});
module.exports = db;


const app = express();

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

//routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

//start server
app.listen(3000, () => {
    console.log("Server started, port is 3000.")
});