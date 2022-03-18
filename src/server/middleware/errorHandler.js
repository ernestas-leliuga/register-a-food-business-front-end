const { error } = require("winston");
const PropsGenerator = require("../propsGenerator");

const errorHandler = (err, req, res, next) => {
  error(err);
  error(`statusCode: ${res ? res.statusCode : err ? err.statusCode : null}`);
  var props = {
    statusCode: res ? res.statusCode : err ? err.statusCode : "500",
    err: err ? err : "An error occurred.",
    errOutput1: "Req.body csrf: " + req.body._csrf,
    errOutput2: "Req.originalUrl: " + req.originalUrl,
    errOutput3: "Req.method: " + req.method,
    ...PropsGenerator(req)
  };
  if (err.message.match("template not found")) {
    res.render("page-not-found", { props });
  } else {
    res.render("internal-server-error", { props });
  }
};

module.exports = { errorHandler };
