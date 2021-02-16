const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config()

const PORT = process.env.PORT || process.env.DEV_PORT
const app = express();

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const mongoClient = mongoose.connection;

mongoClient.once('open',()=>
    console.log("Connection to MongoDB has been established")
)

mongoClient.on('error',console.error.bind(console,'connection:error:'));

app.listen(PORT, ()=>{
    console.log(`Server is listening on port:${PORT}`);
})