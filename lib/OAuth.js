var request = require("request")
  , credential = require("./credential")
  , USER_AGENT = require("./user_agent")
  , ap = require("ap")

var note = "gist-put"
  , note_url = "https://github.com/AWinterman/gist-put"
  , scopes = ["gist"]
  , host = "https://api.github.com/authorizations"

module.exports = get_token

function get_token(ready){
  var f = ap([ready], token)
  credential(f)
}

function get_new_token(ready, credentials){
  var r = {
      url:  host
    , headers: {
        "User-Agent": USER_AGENT
      }
    , body: JSON.stringify({
          scopes: scopes
        , note: note
        , note_url: note_url
      })
    , 'auth': credentials
  }
  request.post(r, function(err, response, body){
    ready(err, JSON.parse(body).token)
  })
}

function token(ready, credentials){
  var r = {
    url: host
  , headers: {"User-Agent": USER_AGENT}
  , auth: credentials
  }
  request.get(r, function(error, response){
    if (error) {
      return ready(error)
    }
    if (response.statusCode != 200) {
      return ready(response.body, response.statusCode)
    }

    //otherwise search for a token 
    var token 
    var token_found = JSON.parse(response.body).some(function(d){
      token = d.token
      return d.note == note
    })
    if (token_found) {
      ready(error, token)
    } else {
      get_new_token(ready, credentials)
    }
  })
}
