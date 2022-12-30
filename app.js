const express = require('express');
const app = express(),
bodyParser = require("body-parser");
port = 3080;
const { spawn } = require('child_process');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/pyt',(req,res)=>{
  const img_url = req.body.url;
  var out_url="";
  const user = req.body.user;
  const pyProg = spawn('/Users/dheerajvajjarapu/Desktop/image_app/delta/bin/python3', ['/Users/dheerajvajjarapu/Desktop/image_app/colorization/test.py',img_url,user]);
  
  pyProg.stdout.on('data',(data)=>{
    // console.log(data.toString());
    out_url = data.toString().slice(0,-1);
  })

 

  pyProg.on('close', data=> {

    console.log(data);
    console.log(out_url);
    res.send(
      {"url":out_url}
    );
        
  });
  
})

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

