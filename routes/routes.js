var index = require("./index");
var users = require("./users");
var note = require("./note");
var category = require("./category");
var comment = require("./comment");
var photo = require("./photo");
var requestProject = require("./myPage/RequestProject");
var myPage = require("./myPage/myPage");
var notification = require("./myPage/notification");

module.exports = function(app){
    app.use("/api/index", index);
    app.use("/api/users", users);
    app.use("/api/note", note);
    app.use("/api/category", category);
    app.use("/api/comment", comment);
    app.use("/api/photo", photo);
    app.use("/api/tct", requestProject);
    app.use("/api/mypage", myPage);
    app.use("/api/notification", notification);

    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}
 
