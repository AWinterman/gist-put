gist-put
=======

`gist-put` is a [gist](https://gist.github.com/) command line utility. It  
makes files into gists! 

## features ##

- `gist-put` takes multiple files or single files, or
  [eventually](https://github.com/AWinterman/gist-put/blob/master/gist-put#L17-L20),
no files at all!
- `gist-put`  doesn't care if you reference files in some or in some distant
  directory, 
- `git-put` gets your credentials at your already-stated level of security
using the `git credential` tool. If `git credentials` doesn't know your
credentials, it'll probably error in an ugly way.  [This is an open
issue](https://github.com/AWinterman/gist-put/issues/1).

It then gets an OAuth2 token from github (or finds the one it already
registered to your account). Your git credentials are safe the entire time, or no  less safe than
they were given that `git credential fill` will print your password in plain
text. 

This module distinguishes itself from the others on npm in that it never asks
you to store your github credentials anywhere in plain text, doesn't ask you to
edit any files in order to store your api token, and is a piece of general node
badassery. Enjoy!

## usage ##

```
$ gist-put file
```
 will make a private gist

```bash
$ gist-put -u -d 'so many files to gist!' 1-file-to-gist 2-file-to-gist 3-file-to-gist
```

will make a public gist of the listed files with the description passed to
`-d`, and return the url. 

```
$ gist-put -a file
```
 will make an anonymous gist of `file`, for if you're
embarrassed about what you have to say. Maybe you like to write semicolons
after the carriage return or your plotting the next American Revolution.

## Use it like a module ##
If for whatever perverted reason you want to play with the constituent pieces,
you can do:

```js
gist_put = require("gist-put")
```
and it won't break everything. However this is not the intended purpose. Maybe
one day I'll add some documentation of how the module actually works.



