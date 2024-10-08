const express = require("express");
const bcrypt = require("bcrypt")
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require('./controllers/image');
const db = knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "postgres",
        password: "1234",
        database: "smart-brain"
    }
});
const app = express();
const port = 3001;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("success"));
app.post("/signin", (req, res) => signin.handleSignin(db, bcrypt)(req, res));
app.post("/register", (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get("/profile/:id", (req, res) => profile.handleProfileGet(req, res, db));
app.put("/image", (req, res) => {
    image.handleImage(req, res, db)
});
app.post("/imageurl", (req, res) => {
    image.handleAPICall(req, res)
});
app.listen(port, () => console.log(`App is running on port ${port}.`));
