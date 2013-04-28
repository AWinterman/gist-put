#!/usr/bin/env node

var anonymous = require("./post")
  , program = require("commander")

program
  .version("0.0.0")
  .usage("[options] <file1, file2>")
  .option("-p, --private", "Make a private gist by reading your authentication details from `git credential fill` (public by default).")
  .option("-a, --anonymous", "Make an anonymous gist")
  .option('-d, --description <string>', "A description for your gist", String)

program.on("--help", function(){
  //additional help?
})

program.parse(process.argv)

var privacy = ["anonymous", "private"]
  .filter(function(d){return program[d]})

anonymous(program.args, process.description) 
