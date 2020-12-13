const fs = require('fs')
const express = require('express');
var cors = require('cors');
const exec = require('child_process').exec;
const app = express();

const https = require('https')

let bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: false }));
app.use(cors());

app.post('/lights', (req, res) => {

    const cmdResult = {
        result: false
    }

    console.log(`Psw: ${req.body.psw}`)
    console.log(`PowerOn: ${req.body.powerOn}`);

    if (req.body.psw != process.env.PSW_API) {
        res.json(cmdResult);
        return;
    }

    cmdResult.result = true;
    
    let myShellScript = '';
    if (req.body.powerOn == true)
        myShellScript = exec('uhubctl/uhubctl -l 2 -a 1');
    else
        myShellScript = exec('uhubctl/uhubctl -l 2 -a 0');

    myShellScript.stdout.on('data', (data)=>{
        console.log(data); 
    });
    myShellScript.stderr.on('data', (data)=>{
        console.error(data);
    });
    

    res.json(cmdResult);
});

https
  .createServer(
    {
      key: fs.readFileSync(`/etc/letsencrypt/live/${process.env.URL_NAME}/privkey.pem`),
      cert: fs.readFileSync(`/etc/letsencrypt/live/${process.env.URL_NAME}/cert.pem`),
      ca: fs.readFileSync(`/etc/letsencrypt/live/${process.env.URL_NAME}/chain.pem`),
    },
    app
  ).listen(443, () => {
    console.log('Listening...')
  })
