# fresh

Yet another basic eleventy starting template

- minimal
- flexible
- minimally styled

## How to use this repo as a template

It's not as straightforward as one might think.

- yet we persist.
- on and on


## This doesn't work 

but this thing does: https://stackoverflow.com/a/50996201/285528x0

Clone the repo 

``` shell

git clone --depth 1 \           # one commit only
          --origin upstream \   # set remote `upstream` to...
          git@github.com:pborenstein/fresh.git \  # this template
          new-site              # name of new site

git clone --depth 1 --origin source  git@github.com:pborenstein/fresh.git  pb2

```

and

``` shell
[master =]$ git remote -vv
upstream	git@github.com:pborenstein/fresh.git (fetch)
upstream	git@github.com:pborenstein/fresh.git (push)
```

keep up us from pushing to `fresh`

https://medium.com/@smrgrace/having-a-git-repo-that-is-a-template-for-new-projects-148079b7f178
http://signalexception.com/blog/2013/11/11/using-git-repos-as-project-templates.html


``` shell
philip@ningal: ~/projects/pb.new
[master =]$ git remote set-url --push upstream no_push

philip@ningal: ~/projects/pb.new
[master =]$ git remote -vv
upstream	git@github.com:pborenstein/fresh.git (fetch)
upstream	no_push (push)

philip@ningal: ~/projects/pb.new
[master =]$ git push upstream
fatal: 'no_push' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

At this point you're ready to use the template

``` shell
philip@ningal: ~/projects/pb.new
[master =]$ git log --oneline
3f2a1ce (grafted, HEAD -> master, upstream/master, upstream/HEAD) template 0.1
```

create the github repo (or similar)
you're probably going to want a remote
called `origin` to point to your github
repo -- the repo that you're going to push to.

``` shell
philip@ningal: ~/projects/pb.new
[master =]$ hub create pb.new
Updating origin
https://github.com/pborenstein/pb.new

philip@ningal: ~/projects/pb.new
[master =]$ git remote -vv
origin	git@github.com:pborenstein/pb.new.git (fetch)
origin	git@github.com:pborenstein/pb.new.git (push)
upstream	git@github.com:pborenstein/fresh.git (fetch)
upstream	no_push (push)

```
