var index = require("./index");
var users = require("./users");
var note = require("./note");
var category = require("./category");
var comment = require("./comment");
var model = require("./model");
var photographer = require("./photographer");
var requestProject = require("./myPage/RequestProject");
var myPage = require("./myPage/myPage");
var notification = require("./myPage/notification");
var whiteboard = require("./whiteboard");
var collaborations = require("./collaboration/collaboration");
var tct = require("./tct/tct");
var tctmember = require("./tct/tctmember");

module.exports = function(app){
    app.use("/api/index", index);
    app.use("/api/users", users);
    app.use("/api/note", note);
    app.use("/api/category", category);
    app.use("/api/comment", comment);
    app.use("/api/model", model);
    app.use("/api/photographer", photographer);
    app.use("/api/project", requestProject);
    app.use("/api/mypage", myPage);
    app.use("/api/tct", tct);
    app.use("/api/tctmember", tctmember);
    app.use("/api/notification", notification);
    app.use("/api/whiteboard", whiteboard);
    app.use("/api/collaboration", collaborations);
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}
