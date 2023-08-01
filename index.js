const connectToMongo = require('./config/db');
const express = require('express')

connectToMongo();
const app = express()
const port = 5000

//middleware
app.use(express.json())

//available routes
app.use('/',require('./routes/userroutes'))
app.use('/admin',require('./routes/login'))
app.use('/register',require('./routes/nmsuccess'))


app.get('/',(req,res)=>{   
    res.send("server running")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})