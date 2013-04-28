gist-put
=======

Still a bit of a work in progress. End goal:

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
after the carriage return or your plotting the next American Revolution. I
don't know the power is yours!

`gist-put` doesn't care if you reference files in some distant
directory, and gets your password securely using the `git credential` tools. If
`git credentials` doesn't know your credentials, it'll probably error in an ugly way.
[This is an open issue](https://github.com/AWinterman/gist-put/issues/1). It
then gets an OAuth2 token from `github` (which it promptly forgets, [another
issue](https://github.com/AWinterman/gist-put/issues/2)), and makes a post over
HTTPS. Your git credentials are safe the entire time, or at least no more
exposed than `git credentials` makes them.

