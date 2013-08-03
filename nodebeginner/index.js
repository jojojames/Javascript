var server = require("./server.js");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/show"] = requestHandlers.show;
handle["/upload"] = requestHandlers.upload;
server.start(router.route, handle);

