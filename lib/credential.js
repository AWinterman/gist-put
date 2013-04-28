module.exports = get_credential

var exec = require("child_process").exec
  , spawn = require('child_process').spawn
  , git_credentials = spawn("git", ["credential", "fill"])


function get_credential(ready){
  // TODO figure out what happens when `git credential` doesn't have access to
  // your username and password, and handle that case

  git_credentials.stdout.on("data", function(data){
    var credential = data.toString("utf-8").split("\n")
        .map(function(d){ return d.split("=") })
        .filter(function(d){ return d.length == 2 })
        .reduce(function(a, b){
          a[b[0]] = b[1]
          return a
        }, {})
    ready(credential)
  })


  git_credentials.stderr.on('data', function(data) {
      console.log('stderr: ' + data);
  })


  git_credentials.on('exit', function(code, signal) {
      if (signal === 0) console.log("Using credentials from `git credential`")
      else if(signal != null) console.log('killed: ' + signal);
  })


  git_credentials.stdin.write("\n")
}
