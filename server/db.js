var mysql = require('mysql');


const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bankhub"
  });

connect.connect(function(err) {
    if (err) throw err;
        console.log("Connected!!!")
    });

module.exports = connect;