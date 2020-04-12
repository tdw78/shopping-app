const express = require('express');
const cors = require("cors");
require('dotenv').config();
const bodyParser = require("body-parser");

module.exports = {
  init(app, express){
    app.use(bodyParser.json());
   
    if((process.env.NODE_ENV === 'development')) {
      app.use(cors({origin: `http://localhost:3000`}));
    }
  }
};
