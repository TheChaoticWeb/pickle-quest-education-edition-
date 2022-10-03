const express = require('express');
const ws = require("express-ws");
const cookieParser = require("cookie-parser");
const app = express();
ws(app);
const port = 6969;
const Database = require("@replit/database")
const { getUserInfo } = require("@replit/repl-auth")
const db = new Database()
const crypto = require('crypto');
var minify = require('express-minify');
//app.use(compression());
app.use(minify());
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));

var allowedUsers = ["baconLover001"];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/game.html');
  /*
  const user = getUserInfo(req)
  if (req.cookies.specialLogin == "yes") {
    if(req.cookies.userName in allowedUsers){
      switch(req.cookies.userName) {
        case "baconLover001":
          if (req.cookies.password == "baconIsTheBest") {
            res.sendFile(__dirname + '/game.html')
          }
          break;
      }
    } else {
      res.sendFile(__dirname + '/specallogin.html')
    }
  } else {
    if (user) {
      res.sendFile(__dirname + '/game.html')
    } else {
      res.sendFile(__dirname + '/login.html')
    }
  }
  */
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  db.list().then(keys => {console.log(keys);});
});

app.ws("/", socket => {
  socket.on("message", function(message) {
    try {
      var data = JSON.parse(message);
      if("type" in data && "data" in data) {
        switch(data.type) {
          case "command":
            break;
          case "save":
            break;
          case "newusr":
            var email = data.email;
            var username = data.username;
            var name = data.name;
            var newUUID = crypto.randomUUID();
            var newUserData = {
              "uuid" : newUUID,
              "username": username,
              "name": name
            };
            db.set(email, newUserData).then(() => {});
            db.get("brown02327@loswego.k12.or.us").then(value => { console.log("value");});
            break;
          case "getusrstatus":
            ws.send(JSON.stringify());
            break;
            
        }
      } else {
        socket.send(JSON.stringify({
          type: "error",
          data: {
            name: "InvalidPayloadError",
            message,
            stack: "InvalidPayloadError: " + message
          }
        }));
      }
    }
    catch {
      socket.send(JSON.stringify({
        type: "error",
        data: {
          name: "InvalidPayloadError",
          message,
          stack: "InvalidPayloadError: " + message
        }
      }));
    }
  });
  socket.send("HELLO FRIEND");
  socket.send("Everything typend from this time to the other time will be logged lool");
});
