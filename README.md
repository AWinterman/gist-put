gist-put
=======


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

`gist-put` doesn't care if you reference files in some distant directory, and
gets your password securely using the `git credential` tools. If `git
credentials` doesn't know your credentials, it'll probably error in an ugly
way.  [This is an open issue](https://github.com/AWinterman/gist-put/issues/1).

It then gets an OAuth2 token from github (looking for the one already
registered to your account), and makes a post over
HTTPS. Your git credentials are safe the entire time, or no  less safe than
they were given that `git credential fill` will print your password in plain
text. 

This module distinguishes itself from the others on npm in that it never asks
you to store your github credentials anywhere in plain text, doesn't ask you to
edit any files in order to store your api token, and is a piece of general node
badassery. Enjoy!



