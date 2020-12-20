const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {promisify} = require("util");

//mysql connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


//signup 
exports.signup = (req, res) => {
    //console.log(req.body);
    //signup form information
    const { username, password, passwordConfirm } = req.body;
    //query to 'users' database where we search for inputted username
    db.query("SELECT username FROM users WHERE username = ?", [username], async (error, results) => {
        if (error) {
            console.log(error);
        }
        //username check
        if (results.length > 0 || username == "") {
            return res.render("signup", {
                message: "Username already taken!"
            });
        //password check
        } else if ( password !== passwordConfirm) {
            return res.render("signup", {
                message: "Passwords don't match."
            });
        }
        if ((password || passwordConfirm) == "") {
            return res.render("signup", {
                message: "Passwords can't be empty."
            });
        }
        //encrypt password
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        //insert info into table
        db.query("INSERT INTO users SET ?", {username: username, password: hashedPassword}, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render("signup", {
                    message: "You have successfully signed up!"
                });
            }
        });
    });
}

//login using jwt
exports.login = async (req, res) => {
    try {
        //login form information
        const {username, password} = req.body;
        //check if fields are empty
        if (!username || !password) {
            return res.status(400).render("login", {
                message: "Check your username and password."
            });
        }
        //query to 'users' database
        db.query("SELECT * FROM users WHERE username = ?", [username], async (error, results) => {
            //console.log(results);
            //no username OR inputted password and database password don't match
            if (!results || !(await bcrypt.compare(password, results[0].password))) {
                res.status(401).render("login", {
                    message: "Username or password wrong."
                });
            } else {
                //proceed to log in user
                const id = results[0].id;
                const token = jwt.sign({id: id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                //console.log("Made a token: " + token);
                const cookieOptions = {
                    expiresIn: new Date(
                        //90 days
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie("jwt_cookie", token, cookieOptions);
                res.status(200).redirect("/profile");
            }
        });
    } catch (error) {
        console.log(error);
    }
}

//check if user is logged in and return username if user is logged in
//this is used to show relevant nav link for loggen/nonlogged users
exports.isLoggedIn = async (req, res, next) => {
    //console.log(req.cookies);
    if (req.cookies.jwt_cookie) {
        try {
            //verify token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt_cookie, process.env.JWT_SECRET);
            //console.log(decoded);
            //check for user in database
            db.query("SELECT * FROM users WHERE id = ?", [decoded.id], (error, result) => {
                console.log(result);
                if (!result) {
                    return next();
                } 
                req.user = result[0];
                return next();
            });

        } catch {
            return next();
        }
    } else {
        next();
    }
}

//post message on forums
exports.postMessage = async (req, res) => {
    //console.log(req.body);
    if (req.cookies.jwt_cookie) {
        try {
            const { message } = req.body;
            //get user ID
            //this can be used to insert username instead of userID
            const decoded = await promisify(jwt.verify)(req.cookies.jwt_cookie, process.env.JWT_SECRET);
            //console.log(decoded.id);
            //insert message with information to the 'posts' database
            db.query("INSERT INTO posts SET ?", {posterID: decoded.id, message: message}, (error, results) => {
                if (error) {
                    console.log(error);
                    return res.render("/profile", {
                        message: "something went wrong..."
                    });
                } else {
                    //successfully posted a message
                    res.redirect("/posts");
                }
            });
        } catch {
            console.log(error);
        }
    }
}

//logout - give cookie a new value(empty) and change expiration
exports.logout = async (req, res) => {
    res.cookie("jwt_cookie", "", {
        expires: new Date(Date.now() + 2*1000),
        httpOnly: true
    });
    //redirect to home page
    res.status(200).redirect("/");
}

//this allows us to see mysql database contents from 'posts'
exports.posts = async (req, res, next) => {
    db.query("SELECT * FROM posts", (error, results) => {
        req.message = results;
        return next();
        });
}
