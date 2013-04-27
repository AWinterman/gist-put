// Post to https://api.github.com/gists

// Expects files to be a json object:
// ```json
//    { "file1.md": {
//      content: "String of the file"
//      }
//    }
// ```

module.exports = simple_post

request = require("request")
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
      if (err) console.log(err)
      if (data) {
        files[file_names[counter]] = {content: ""+data}
      }
      // So long as we have not exhausted the list of files, call handler with
      // the next one.
      (++counter < file_names.length) || done(payload)

    }
  }

  function done(payload){
    console.log(payload)
    request.post({
        url: "https://api.github.com/gists" 
      , json: payload
    }, function(err, data){ console.log(data.statusCode, data.body)})
  }
}
