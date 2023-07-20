const connectToMongo = require('./config/db');
const express = require('express')

connectToMongo();
const app = express()
const port = 5000

//middleware
app.use(express.json())

//available routes
app.use('/admin/login',require('./routes/login'))

app.get('/',(req,res)=>{   
    res.send("server running")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})