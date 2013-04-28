var request = require("request")
  , credential = require("./credential")
  , USER_AGENT = require("./user_agent")


// getting authorization
// curl -v -u AWinterman -d '{"scopes":["repo", "gists"], "note":"help
// example"}' https://api.github.com/authorizations
//
// TODO add logic to store the token once you get it,
// and then to check the store to see if we currently have a valid token

module.exports = get_token

function get_token(ready){
  credential(function(credentials){
    var r = {
        url: "https://api.github.com/authorizations" 
      , headers: {
          "User-Agent": USER_AGENT
        }
      , body: JSON.stringify({
            scopes: ["gist"]
          , note: "gist.js"
        })
      , 'auth': credentials
      }
    request.post(r, ready)
  })
}
