var index = require("./index");
var users = require("./users");
var note = require("./note");
var category = require("./category");
var comment = require("./comment");
var model = require("./model");
var requestProject = require("./myPage/RequestProject");
var myPage = require("./myPage/myPage");
var notification = require("./myPage/notification");
var photographicAreaM = require("./photographicAreaM");

module.exports = function(app){
    app.use("/api/index", index);
    app.use("/api/users", users);
    app.use("/api/note", note);
    app.use("/api/category", category);
    app.use("/api/comment", comment);
    app.use("/api/model", model);
    app.use("/api/tct", requestProject);
    app.use("/api/mypage", myPage);
    app.use("/api/notification", notification);
    app.use("/api/photographicAreaM", photographicAreaM);
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}
