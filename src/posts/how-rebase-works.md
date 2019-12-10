---
title: How Rebase Works
category: Tech
tags:
  - git
  - learning
---



We've been working on `topic`.
While we were doing that,
work on `master` went on.
The commit graph looks like this.
(`HEAD` indicates the current branch.)


``` text
             HEAD
               |
            master
               |
C1---C2---C5---C6
      \
       C3---C4
            |
          topic
```

``` text
$ git log --oneline --all --graph
* 1504acd C6
* 2bdc51e C5
| * 7011dcf C4
| * 46908d0 C3
|/  
* 632c728 C2
* 00d5302 C1

```

We want to keep working on `topic`,
but we also want
to pick up the new commits
from `master`.
What we want to do is
to move
all of the commits
on the `topic` branch
(commits `C3` and `C4`)
to the end of `master`.
The commit graph will
end up looking like this:

``` text
            master
               |
C1---C2---C5---C6--C3---C4
                        |
                      topic
                        |
                      HEAD
```

!!! Well, actually…
It's possible
that commits
`C3` and `C4`
will introduce conflicts with
`C5` and `C6`
(the commits that were made while we were working on `topic`).
So the `C3` and `C4` commits
that we tack on to the end of `C6`
might be different.
The end result is this,
where `C3'` is like `C3` but with some changes.

``` text
            master
               |
C1---C2---C5---C6--C3'---C4'
                         |
                       topic
                         |
                       HEAD

```
!!!



## Rebase

The command that does all this
is `git rebase`. It's called like this:

> `git rebase upstream branch`

which means:
Tack `branch`
onto the end of
`upstream`.
If we don't specify `branch`,
`rebase` uses the current branch.

In our case, this is the command we'll use:

> `git rebase master topic`

## Step 1: Switch branches

!!! what does the man page say?
> If `<branch>` is specified, `git rebase` will perform
> an automatic `git switch <branch>` before doing
> anything else. Otherwise it remains on the current
> branch.
!!!

In our case,
we switch to `topic`:

``` text
            master
               |
C1---C2---C5---C6
      \
       C3---C4
            |
          topic
            |
          HEAD
```

## Step 2: Identify the affected commits

!!! Then the git rebase man page says…
> All changes made by commits in the current branch
> but that are not in `<upstream>` are saved to a
> temporary area. This is the same set of commits
> that would be shown by `git log <upstream>..HEAD`;
> or by `git log 'fork_point'..HEAD`, if `--fork-point`
> is active […]; or by `git log HEAD`, if the `--root` option
> is specified.
!!!

We need to find all the commits
in the current branch (`topic`)
that are not
in the upstream branch (`master`).
These are the commits listed by the following command
(`HEAD` and `topic` point to the same commit):

``` shell
$ git log --oneline master..HEAD
7011dcf C4
46908d0 C3
```

The documentation says
that these commits are
stashed ^[I don't know that rebase actually uses the same
mechanism as the stash command, but it seems plausible.]
in a temporary area.




## Step 3: Reset the current branch

!!! Man page
> The current branch is reset to `<upstream>`, or
> `<newbase>` if the `--onto` option was supplied. This
> has the exact same effect as
> `git reset --hard <upstream>` (or `<newbase>`).
> `ORIG_HEAD` is set to
> point at the tip of the branch before the reset.
!!!

The current branch is set to `master`,
but we keep a reference to `topic`
in `ORIG_HEAD`
(which was the current branch).


``` text
             HEAD
               |
            master
               |
C1---C2---C5---C6
      \
       C3---C4
            |
          topic
            |
        ORIG_HEAD
```


## Step 4

!!! Man page
> The commits that were previously saved into the
> temporary area are then reapplied to the current
> branch, one by one, in order. Note that any
> commits in `HEAD` which introduce the same textual
> changes as a commit in `HEAD..<upstream>` are
> omitted (i.e., a patch already accepted upstream
> with a different commit message or timestamp will
> be skipped).

> It is possible that a merge failure will prevent
> this process from being completely automatic. You
> will have to resolve any such merge failure and
> run `git rebase --continue`. Another option is to
> bypass the commit that caused the merge failure
> with `git rebase --skip`. To check out the original
> `<branch>` and remove the `.git/rebase-apply` working
> files, use the command `git rebase --abort` instead.
!!!

This means
the commits we stashed away
are reapplied
one by one
to the current branch `master`

OK here.
What exactly does it mean to reapply a commit.
Well, it's cherry picking.

I think we can simulate rebasing like this:

Create an orphan branch
add the commits to it 
can you even do this?

