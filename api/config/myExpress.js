const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const cors = require('cors')
 
module.exports = () => {
 const app = express()
 const corsOptions = {
  exposedHeaders: ['x-access-token']
 };

 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: true }))
 app.use(cors(corsOptions));
 
 consign()
   .include('controllers')
   .into(app)
 
 return app
}