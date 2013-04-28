module.exports = simple_post

var USER_AGENT = require("./user_agent")
  , oauth = require("./OAuth")
  , request = require("request")
  , path = require("path")
  , fs = require("fs")


// file_names is a list of file names, privacy is an array with three possible
function simple_post(file_names, privacy, description){
  // iterate through each file, opening it and reading the contents

  var payload 
  var counter = 0
    , files_left = file_names.length
    , files = {}
    , privacy_flag
  

  payload = {
      description: description
    , public: true
    , files: files
    }

  if  (privacy === "public" || privacy === "private") {
    // otherwise this needs to be not set
    payload.public  = privacy === "public"
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
      , headers: {"User-Agent": USER_AGENT }
      , json: payload
    }

    if (payload.public !== undefined){
      // then we need to get an Oauth token
      oauth(function(err, data){
        r.headers.Authorization = "bearer " +  JSON.parse(data.body).token
        request.post(r, report)
      })
    } else {
      request.post(r, report)
    }
  }
}

function report(err, data){
  // TODO open browser automatically
  console.log("url: ", data.body.html_url)
}
