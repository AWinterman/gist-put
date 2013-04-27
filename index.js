#!/usr/bin/env node

var anonymous = require("./anonymous")
  , program = require("commander")

program
  .version("0.0.0")
  .option("-u, --public", "Make a public gist under your username")
  .option("-p, --private", "Make a private gist, will require authentication")
  .option("-a, --anonymous", "Make an anonymous gist, default if no authentication is provided")
  .option('-d, --description <string>', "A description for your gist", String)

program.parse(process.argv)

anonymous(program.args, process.description) 
