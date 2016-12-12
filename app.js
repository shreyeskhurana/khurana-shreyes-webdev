module.exports = function(app) {
    require("./assignment/app.js")(app);
    require("./project/app.js")(app);
};