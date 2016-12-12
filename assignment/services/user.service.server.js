module.exports = function(app, model) {
    var passport         = require('passport');
    var LocalStrategy    = require('passport-local').Strategy;
    var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var cookieParser     = require('cookie-parser');
    var session          = require('express-session');
    var bcrypt           = require("bcrypt-nodejs");
    var facebookConfig = {
        // clientID     : process.env.FACEBOOK_CLIENT_ID,
        // clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        // callbackURL  : process.env.FACEBOOK_CALLBACK_URL
        clientID     : "1799432180320267",
        clientSecret : "d4518f4f398c20f15c1349852bcf177d",
        callbackURL  : 'http://localhost:3000/auth/facebook/callback'
    };
    var googleConfig    = {
        // clientID     : process.env.GOOGLE_CLIENT_ID,        //public key
        // clientSecret : process.env.GOOGLE_CLIENT_SECRET,    //private key
        // callbackURL  : process.env.GOOGLE_CALLBACK_URL      //what url would be listening once we get a callback
        //make process env variables using bash profile exports/bash/
        clientID     : "833689752885-dn2mr0u7nmnc98lppv5n7qb79rman7e0.apps.googleusercontent.com",
        clientSecret : "miVwKWn2sWi-QdWVmNAOb--t",
        callbackURL  : 'http://localhost:3000/auth/google/callback'
    };

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    app.use(session({                   //configure raw session
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());     //configure passport session
    app.use(passport.session());
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/checkAdmin', checkAdmin);
    app.post('/api/logout', logout);
    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', loggedInAndSelf, updateUser);
    app.delete('/api/user/:uid', loggedInAndSelf, unregisterUser);

    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email'}));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));

    function facebookStrategy(token, refreshToken, profile, done) {
        model
            .userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");

                        console.log(profile);

                        var newFacebookUser = {
                            username: names[0],
                            first: names[0],
                            last:  names[1],
                            email:     profile.emails ? profile.emails[0].value : "",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model
                            .userModel
                            .createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        model
            .userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    }
                    else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            first: profile.name.givenName,
                            last:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };

                        return model
                            .userModel
                            .createUser(newGoogleUser);

                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(    //second then should belong to model.usermodel.createUser but is used here to synchronize asynchronus calls
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function localStrategy(username, password, done) {  //expects the post already has username and pass in body
        model                                   //used as a return parameter (function)
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password))
                        return done(null, user);
                    else
                        return done(null, false); //error-message, user/falsy message
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {    //what to put in the cookie for the current session:
                                            // we can put user/or just put id
        done(null, user);                   //everything inside will be encrypted
    }                                       //to encrypt sending use ssl!

    function deserializeUser(user, done) {  //
        model
            .userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function checkAdmin(req, res) {
        var loggedIn = req.isAuthenticated();
        var isAdmin = req.user.role == "ADMIN";
        if(loggedIn && isAdmin) {
            res.json(req.user);
        }
        else {
            res.send('0');
        }
    }

    function loggedInAndSelf(req, res, next) {
        var loggedIn = req.isAuthenticated();
        var userId = req.params.uid;
        var self = userId == req.user._id;

        if(self && loggedIn){
            next();
        }
        else {
            res.sendStatus(400);
        }
    }

    function login(req, res) {
        var user = req.user;
        if(user)
            res.json(user);
        else
            res.send('0');
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function createUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        model
            .userModel
            .createUser(user)
            .then(
                function (newUserObject) {
                    res.send(newUserObject);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUser(req, res) {
        var query = req.query;

        if (query.username && query.password) {
            findUserByCredentials(req, res);
        }
        else if (query.username) {
            findUserByUsername(req, res);
        }
        else {
            res.json(req.user); //passport made user available22
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user)
                        res.json(user);
                    else
                        res.send("0");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;

        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user)
                        res.json(user);
                    else
                        res.send("0");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserById(req, res) {
        var uid = req.params.uid;

        model
            .userModel
            .findUserById(uid)
            .then(
                function (userObject) {
                    if(userObject)
                        res.send(userObject);
                    else
                        res.send("0");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;

        model
            .userModel
            .updateUser(uid, user)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function () {
                    res.sendStatus(400);
                }
            );
    }

    function unregisterUser(req, res) {
        var uid = req.params.uid;

        model
            .userModel
            .removeUser(uid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }
};