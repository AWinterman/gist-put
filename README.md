gist-put
=======

`gist-put` is a [gist](https://gist.github.com/) command line utility. It makes gists out of files! 

## features ##

- it takes multiple files, single files, or
  [eventually](https://github.com/AWinterman/gist-put/blob/master/gist-put#L17-L20),
no files at all!
- it doesn't care if you reference files in `pwd` or in some distant
  directory (this was a problem with the alternative I tried).
- it gets your credentials at your already-stated level of security
using the `git credential` tool. If `git credentials` doesn't know your
credentials, it'll probably error in an ugly way.  [This is an open
issue](https://github.com/AWinterman/gist-put/issues/1).

It'll get your OAuth2 token from github, letting them deal with how to store
such things securely. Your git credentials are safe the entire time, or no
less safe than they were given that `git credential fill` will print your
password in plain text if you ask nicely. 

This module distinguishes itself from the others on npm in that it never asks
you to store your github credentials anywhere in plain text, doesn't ask you to
edit any files in order to store your api token, and has a better sense of
humor. Enjoy!

## installation ##

You'll love it, so why don't you npm install it:
```
$ npm install gist-put
```


If you ever decide you hate it, npm uninstall ftw!

```
npm uninstall gist-put
```

And then find `gist-put` among your [authorized apps](https://github.com/settings/applications) on github, and remove it from
the list. 

I guess I could provide a commandline argument for this last step... If this is
something you'd like, contact me @AWinterman (on github) or @AndyWinterman (on
twitter) and we can work it out. Even better, submit a pull request!


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



