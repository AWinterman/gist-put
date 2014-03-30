module.exports = simple_post

var USER_AGENT = require("./user_agent")
  , oauth = require("./OAuth")
  , request = require("request")
  , open = require("open")
  , path = require("path")
  , ap = require("ap")
  , fs = require("fs")

// file_names is a list of file names, privacy is an array with three possible
function simple_post(file_names, privacy, description, to_open){
  var privacy_flag
    , payload

  payload = {
      description: description
    , public: true
    , files: {}
  }

  if(privacy === "public" || privacy === "secret") {
    // otherwise this needs to be not set
    payload.public = privacy === "public"
  }

  load_files(file_names, payload, to_open, done)
}

function load_files(filenames, payload, to_open, done) {
  if(!filenames.length) {
    return done(null, {to_open: to_open, payload: payload})
  }

  var current_file = filenames.shift()

  fs.stat(current_file, onstat)

  function onstat(err, stat) {
    if(err) {
      return done(err)
    }

    if(stat.isFile()) {
      fs.readFile(current_file, onfile)
    } else {
      load_files(filenames, payload, to_open, done)
    }
  }

  function onfile(err, data) {
    var name = path.basename(current_file)

    if(err) {
      return done(err)
    }

    if(data) {
      payload.files[name] = {content: ""+data}
    }

    load_files(filenames, payload, to_open, done)
  }
}

function done(error, data) {
  if(error) {
    console.log(error)
    process.exit(1)
  }

  var payload = data.payload

  var r = {
      url: "https://api.github.com/gists"
    , headers: {"User-Agent": USER_AGENT }
    , json: payload
  }

  var this_report = ap([data.to_open], report)

  if(payload.public !== undefined){
    // then we need to get an Oauth token
    oauth(function(err, token){
      if(err) {
        console.log(err)
        process.exit(1)
      }

      r.headers.Authorization = "bearer " +  token
      request.post(r, this_report)
    })
  } else {
    request.post(r, this_report)
  }
}

function report(to_open, err, data){
  if(err) {
    console.log(err)
    process.exit(1)
  }

  console.log("url: ", data.body.html_url)

  if(to_open) {
    console.log("Opening the page in your browser")
    open(data.body.html_url)
  }
}
