const express = require('express');
const app = express();
const port = 3001;
const middleware = require("./middleware")
const path = require('path')
const bodyParser = require("body-parser")
const mongoose = require("./database");
const session  = require("express-session");



const server = app.listen(port, () => 
    console.log("server listening on port 3001" + port)
);

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret : "bbq chips",
    resave : true,
    saveUninitialized : false

}))

//routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const logoutRoutes = require('./routes/logout');

//api routes
const postsApiRoute = require('./routes/api/posts');

app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.use("/api/posts", postsApiRoute);

app.use("/logout", logoutRoutes);

app.get("/", middleware.requireLogin, (req, res, next) => {

    var payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    }
    res.status(200).render("home", payload);
})
