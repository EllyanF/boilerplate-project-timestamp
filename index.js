// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", (req, res) => {
  var date = req.params.date;
  //Shows current date if parameter is empty
  if (date === undefined) {
    var currentDate = new Date();
    return res.json({
      "unix": currentDate.getTime(), "utc": currentDate.toUTCString()
    });
  };

  //Maintain unix date if it's already on request body
  if (!(isNaN(date))) {
    var unixInNumber = parseInt(date);
    return res.json({
      "unix": unixInNumber, "utc": new Date(unixInNumber).toUTCString()
    });
  };

  //Check if date inserted is invalid
  if (isNaN(Date.parse(date))) {
    return res.json({
      "error": "Invalid Date"
    });
  }

  return res.json({
    "unix": new Date(Date.parse(date)).getTime(), "utc": new Date(Date.parse(date)).toUTCString()
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
