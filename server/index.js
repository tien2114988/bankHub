const express = require('express');
const connect = require('./db');

const axios  = require('axios');
require('dotenv').config();


const app = express();
const PORT = 3001;
const redirectUri = 'http://localhost:3000/success';


app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.get('/getIdentity/:grant_id',(req, res)=>{
  const grantId = req.params.grant_id; // Extract grant_id from request parameters
  
  // Query to retrieve access token based on grant_id
  const sql = "SELECT access_token FROM accesstoken WHERE grant_id = ?";
  
  // Execute the SQL query
  connect.query(sql, [grantId], function(err, result) {
      if (err) {
          console.error("Error retrieving access token:", err);
          res.status(500).json({ error: "Error retrieving access token" });
          return;
      }

      // If no rows were returned, grant_id not found
      if (result.length === 0) {
          res.status(404).json({ error: "Grant_id not found" });
          return;
      }

      // Access token found, proceed with API request
      const accessToken = result[0].access_token;
      const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://sandbox.bankhub.dev/identity',
          headers: { 
              'Accept': 'application/json', 
              'x-client-id': process.env.clientId, 
              'x-secret-key': process.env.secretKey, 
              'Authorization': accessToken
          }
      };

      // Make API request to fetch transactions
      axios(config)
          .then((response) => {
              res.json(response.data); // Return transaction data
          })
          .catch((error) => {
              console.error("Error fetching identity:", error);
              res.status(500).json({ error: "Error fetching identity" });
          });
  });
})

app.get('/getBalance/:grant_id',(req, res)=>{
  const grantId = req.params.grant_id; // Extract grant_id from request parameters
  
  // Query to retrieve access token based on grant_id
  const sql = "SELECT access_token FROM accesstoken WHERE grant_id = ?";
  
  // Execute the SQL query
  connect.query(sql, [grantId], function(err, result) {
      if (err) {
          console.error("Error retrieving access token:", err);
          res.status(500).json({ error: "Error retrieving access token" });
          return;
      }

      // If no rows were returned, grant_id not found
      if (result.length === 0) {
          res.status(404).json({ error: "Grant_id not found" });
          return;
      }

      // Access token found, proceed with API request
      const accessToken = result[0].access_token;
      const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://sandbox.bankhub.dev/balance',
          headers: { 
              'Accept': 'application/json', 
              'x-client-id': process.env.clientId, 
              'x-secret-key': process.env.secretKey, 
              'Authorization': accessToken
          }
      };

      // Make API request to fetch transactions
      axios(config)
          .then((response) => {
              res.json(response.data); // Return transaction data
          })
          .catch((error) => {
              console.error("Error fetching balance:", error);
              res.status(500).json({ error: "Error fetching balance" });
          });
  });
})

app.get('/getGrantId', (req, res)=>{
  var sql = "SELECT grant_id FROM accesstoken";
  connect.query(sql, function(err, result) {
    if (err) throw err;
    res.status(200).json(result);
 });
})

app.get('/getTransaction/:grant_id', (req, res) => {
  const grantId = req.params.grant_id; // Extract grant_id from request parameters
  
  // Query to retrieve access token based on grant_id
  const sql = "SELECT access_token FROM accesstoken WHERE grant_id = ?";
  
  // Execute the SQL query
  connect.query(sql, [grantId], function(err, result) {
      if (err) {
          console.error("Error retrieving access token:", err);
          res.status(500).json({ error: "Error retrieving access token" });
          return;
      }

      // If no rows were returned, grant_id not found
      if (result.length === 0) {
          res.status(404).json({ error: "Grant_id not found" });
          return;
      }

      // Access token found, proceed with API request
      const accessToken = result[0].access_token;
      const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://sandbox.bankhub.dev/transactions',
          headers: { 
              'Accept': 'application/json', 
              'x-client-id': process.env.clientId, 
              'x-secret-key': process.env.secretKey, 
              'Authorization': accessToken
          }
      };

      // Make API request to fetch transactions
      axios(config)
          .then((response) => {
              res.json(response.data); // Return transaction data
          })
          .catch((error) => {
              console.error("Error fetching transactions:", error);
              res.status(500).json({ error: "Error fetching transactions" });
          });
  });
});

app.post('/publicToken',(req, res) =>{
    const axios = require('axios');
    let data = JSON.stringify({
        "publicToken": req.body.publicToken
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://sandbox.bankhub.dev/grant/exchange',
        headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'x-client-id': process.env.clientId, 
            'x-secret-key': process.env.secretKey
        },
        data : data
    };

    axios(config)
        .then((response) => {
          var sqlCheck = "SELECT COUNT(*) AS count FROM accesstoken WHERE grant_id = ?";
          connect.query(sqlCheck, [response.data.grantId], function(err, rows) {
            if (err) {
              console.error("Error checking grant_id existence:", err);
              res.status(500).json({ error: "Error checking grant_id existence" });
              return;
            }
            
            if (rows[0].count > 0) {
              console.log("grant_id already exists, skipping insertion.");
              res.status(200).json(response.data); // Return success response without inserting
              return;
            }
          
            var sqlInsert = "INSERT INTO accesstoken (access_token, grant_id) VALUES (?, ?)";
            connect.query(sqlInsert, [response.data.accessToken, response.data.grantId], function(err, result) {
              if (err) {
                console.error("Error inserting records:", err);
                res.status(500).json({ error: "Error inserting records" });
                return;
              }
              console.log("Number of records inserted:", result.affectedRows);
              res.status(200).json(response.data);
            });
          });
        })
        .catch((error) => {
            console.log(error);
        });
});

app.post('/createLink',(req, res)=>{
    let data = JSON.stringify({
        "scopes": "identity,balance,transaction",
        "redirectUri": redirectUri,
        "language": "vi"
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://sandbox.bankhub.dev/grant/token',
        headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'x-client-id': process.env.clientId, 
            'x-secret-key': process.env.secretKey
        },
        data : data
    };

    axios(config)
        .then((response) => {
            const grantToken = response.data.grantToken;
            const link = `https://dev.link.bankhub.dev?grantToken=${grantToken}&redirectUri=${redirectUri}&iframe=false`
            res.status(200).json(link);
        })
    .catch((error) => {
        console.log(error);
    });
})

app.listen(PORT, (error) =>{
    if(!error){
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    }
    else {
        console.log("Error occurred, server can't start", error);
    }
});
