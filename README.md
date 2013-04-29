gist-put
=======

It makes [gists](https://gist.github.com/) out of files! From the command line!

## features ##

- it takes multiple files, single files, or
  [eventually](https://github.com/AWinterman/gist-put/blob/master/gist-put#L17-L20),
no files at all!
- it doesn't care if you reference files in `pwd` or in some distant
  directory (this was a problem with the alternative I tried).
- it gets your credentials at your already-stated level of security
using the `git credential` tool. If `git credential` doesn't know your
credentials, it'll probably error in an ugly way.  [This is an open
issue](https://github.com/AWinterman/gist-put/issues/1).

It'll get your OAuth2 token from github, letting them deal with how to store
such things securely. Your github credentials are safe the entire time, or no
less safe than they were given that `git credential` will print your
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

`gist-put` will make a gist, and print the url to the command line. Eventually
this will also put the url in your clipboard, or open a browser window with
your gist in it, just the way everybody else's gist utility does. There are options to determine
privacy on the gist, and to add a description if you swing that way.

```bash
# a private gist
gist-put file

# be descriptive:
gist-put -d 'so many files to gist!'  file

# make it public
gist-put -u file 

# multiple files at once:
gist-put 1-file-to-gist 2-file-to-gist 3-file-to-gist

# make it anonymous
gist-put -a file
```

## Use it like a module ##
If for whatever reason you want to play with the constituent pieces,
you can do:

```js
gist_put = require("gist-put")
```
and it won't break everything. However this is not the intended purpose. Maybe
one day I'll add some documentation of how the module actually works.



