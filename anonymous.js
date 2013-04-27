module.exports = simple_post

request = require("request")
path = require("path")
fs = require("fs")

function simple_post(file_names, description){
  // iterate through each file, opening it and reading the contents

  var payload 
  var counter = 0
    , files_left = file_names.length
    , files = {}

  payload = {
      description: description
    , public: true
    , files: files
    }


  for (var i = 0, len = file_names.length; i < len; ++i){
    fs.readFile(file_names[i], handler)

    function handler(err, data){
      // got to save a local reference to i, cause by the time these get called
      // the enclosing scope will have changed
      var name = path.basename(file_names[counter])
      if (err) console.log(err)
      if (data) {
        files[name] = {content: ""+data}
      }
      // So long as we have not exhausted the list of files, call handler with
      // the next one.
      (++counter < file_names.length) || done(payload)
    }
  }

  function done(payload){
    var r = {
        url: "https://api.github.com/gists" 
      , headers: {"User-Agent": "nodejs/0.0.1 (node) gist command line tool v0.0.1 by @AWinterman" }
      , json: payload
    }
    request.post(r, function(err, data){ console.log("url: ", data.body.html_url)})
  }
}
