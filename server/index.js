const express = require('express');


const axios  = require('axios');
require('dotenv').config();

var fs = require('fs');

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

app.get('/getIdentity',(req, res)=>{
    let accessToken = fs.readFileSync("accessToken.txt");
    let config = {
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
      
      axios(config)
      .then((response) => {
        res.json(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
})

app.get('/getBalance',(req, res)=>{
    let accessToken = fs.readFileSync("accessToken.txt");
    let config = {
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
      
      axios(config)
      .then((response) => {
        res.json(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
})

app.get('/getTransaction',(req, res)=>{
    let accessToken = fs.readFileSync("accessToken.txt");
    let config = {
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
      
      axios(config)
      .then((response) => {
        res.json(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
})

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
            fs.writeFileSync("accessToken.txt",response.data.accessToken, (err)=>{
                if(err){
                    console.log(err);
                }
                console.log("successfully write to file")
            })
            res.status(200).json(response.data);
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
