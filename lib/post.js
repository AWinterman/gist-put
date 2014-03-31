module.exports = simple_post

var USER_AGENT = require("./user_agent")
  , oauth = require("./OAuth")
  , request = require("request")
  , open = require("open")
  , path = require("path")
  , ap = require("ap")
  , fs = require("fs")

// file_names is a list of file names, privacy is an array with three possible
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

    if(data.options.blocks) {
      blocks_url = response.body.html_url
        .replace('gist.github.com', 'bl.ocks.org')

      console.log('bl.ocks url: ', blocks_url)
    }

    console.log("gist url: ",  response.body.html_url)

    if(data.options.open && data.options.blocks) {
      console.log("Opening the bl.ocks in your browser")

      open(blocks_url)

      return
    }

    if(data.options.open) {
      console.log("Opening the page in your browser")

      open(response.body.html_url)
    }


  }

}

