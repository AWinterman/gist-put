module.exports = simple_post

var USER_AGENT = require("./user_agent")
  , request = require("request")
  , qs = require('querystring')
  , oauth = require("./OAuth")
  , open = require("open")
  , path = require("path")
  , URL = require('url')
  , fs = require("fs")

// filenames is an array, options is an object of command line options.
function simple_post(file_names, options){
  var privacy_flag
    , payload

  payload = {
      description: options.description
    , files: {}
  }

  if(options.public) {
    payload.public = true
  } else if(!options.anonymous) {
    // then we must be private.
    payload.public = false
  }

  load_files(file_names, payload, options, done)
}

function load_files(filenames, payload, options, done) {
  if(!filenames.length) {
    return done(null, {options: options, payload: payload})
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
      load_files(filenames, payload, options, done)
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

    load_files(filenames, payload, options, done)
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

  if(payload.public !== undefined){
    // then we need to get an Oauth token
    oauth(function(err, token){
      if(err) {
        console.log(err)
        process.exit(1)
      }

      r.headers.Authorization = "bearer " +  token
      request.post(r, onrequest)
    })
  } else {
    request.post(r, onrequest)
  }

  function onrequest(err, response) {
    if(err) {
      console.log(err)
      process.exit(1)
    }

    var blocks_url = ''

    var url = URL.parse(response.body.html_url)

    if(data.options.blocks) {
      url = {
          hostname: 'bl.ocks.org'
        , pathname: url.pathname
        , protocol: url.protocol
      }
    }

    if(data.options.requirebin) {
      url = {
          hostname: 'requirebin.com'
        , protocol: 'http'
        , query: {gist: url.pathname}
      }
    }

    console.log("url: ",  URL.format(url))

    if(data.options.open) {
      console.log("Opening the url in your browser")

      open(blocks_url)

      return
    }
  }
}

