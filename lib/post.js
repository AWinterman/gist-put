module.exports = simple_post

var USER_AGENT = require("./user_agent")
  , oauth = require("./OAuth")
  , request = require("request")
  , open = require("open")
  , path = require("path")
  , ap = require("ap")
  , fs = require("fs")


// file_names is a list of file names, privacy is an array with three possible
function simple_post(file_names, privacy, description, to_open, to_block){
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

  if  (privacy === "public" || privacy === "secret") {
    // otherwise this needs to be not set
    payload.public = privacy === "public"
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
      (++counter < file_names.length) || ap([to_open], done)(to_block, payload)
    }
  }

  function done(to_open, to_block, payload){

    var r = {
        url: "https://api.github.com/gists" 
      , headers: {"User-Agent": USER_AGENT }
      , json: payload
    }
    var this_report = ap([to_open, to_block], report)
    if (payload.public !== undefined){
      // then we need to get an Oauth token
      oauth(function(err, token){
        if (err) console.log(err)
        r.headers.Authorization = "bearer " +  token
        request.post(r, this_report)
      })
    } else {
      request.post(r, this_report)
    }
  }
}

function report(to_open, to_block, err, data){
  // TODO open browser automatically
  console.log("url: ", data.body.html_url)
  if (to_open) {
    console.log("Opening the page in your browser")
    open(data.body.html_url)
  }
  if (to_block) {
    console.log("Opening the Block in your browser");
    var block = "http://bl.ocks.org";
    var gist = "https://gist.github.com";
    var str = data.body.html_url;
    var b = str.replace(gist, block);
    open(b);    
  }
}
