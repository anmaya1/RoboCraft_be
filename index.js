const connectToMongo = require('./config/db');
const express = require('express')

connectToMongo();
const app = express()
const port = 3000

app.get('/',(req,res)=>{
    
    res.send("server running")
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})