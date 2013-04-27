#!/usr/bin/env node


var program = require("commander")

program
  .version("0.0.0")
  .option("-m, --me", "Make a public gist under your username")
  .option("-p, --private", "Make a private gist, will require authentication")
  .option("-a, --anonymous", "Make an anonymous gist, default if no authentication is provided")
  .option('-d, --description', "A description for you rigst")

program.parse(process.argv)
