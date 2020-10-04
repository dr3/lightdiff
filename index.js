#!/usr/bin/env node

const validate = require('./src/validate'),
      params = require('./src/params');

var config = params(); 

if(validate(config)){
    const lightdiff = require('./src/lightdiff');

    console.log(config)

    lightdiff(config);
}
