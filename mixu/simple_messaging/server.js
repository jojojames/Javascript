var http = require('http'),
    url = require('url'),
    fs = require('fs');

var messages = [];
var clients = [];


http.createServer(function (request, response) {
  // parse url
  var url_parts = url.parse(request.url);
  //console.log(url_parts);

  if(url_parts.pathname == '/') {
    // file serving
    fs.readFile('./index.html', function(error, data) {
      response.end(data);
    });
  } else if(url_parts.pathname.substr(0, 5) == '/poll') {
    // polling code here
    var count = url_parts.pathname.replace(/[^0-9]*/, '');
    console.log(count);
    if(messages.length > count) {
      response.end(JSON.stringify( {
        count: messages.length,
        append: messages.slice(count).join("\n") + "\n"
      }));
    } else {
      clients.push(response);
      console.log("Pushing client with response" + response);
    }
  } else if (url_parts.pathname.substr(0, 5) == '/msg/') {
    // message receiving
    var msg = unescape(url_parts.pathname.substr(5));
    messages.push(msg);
    while(clients.length > 0) {
      var client = clients.pop();
      client.end(JSON.stringify( {
        count: messages.length,
        append: msg + "\n"
      }));
    }
    response.end();
  }
}).listen(9000, 'localhost');
console.log('Server running.');
