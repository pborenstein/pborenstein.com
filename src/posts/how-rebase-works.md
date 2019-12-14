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

Here's  some ASCII art that shows
state of affairs.

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

And here's how `git log` renders
the same graph.

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

> `git rebase <upstream> <branch>`

which means:

> Tack `branch`
> onto the end of
> `upstream`.
> If you don't specify `branch`,
> `rebase` uses the current branch.

In our case, this is the command we'll use:

> `git rebase master topic`

According to its man page, rebase does its work in four steps:

1. Switch to the branch that you want to move.
2. Find the commits that need to move.
3. Switch to the branch that will receive the commits.
4. Apply the commits from step 2 to the current branch.

Let's go through each step.

## Step 1: Switch branches

The `git rebase` man page says:

> If `<branch>` is specified, `git rebase` will perform
> an automatic `git switch <branch>` before doing
> anything else. Otherwise it remains on the current
> branch.

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

The man page goes on:

> All changes made by commits in the current branch
> but that are not in `<upstream>` are saved to a
> temporary area. This is the same set of commits
> that would be shown by <br>
> `git log <upstream>..HEAD`
> … ^[It actually goes on a bit more.]

We need to find

- all the commits in the current branch (`topic`)
- that are not in the upstream branch (`master`)

These are the commits listed by the following command

``` shell
$ git log --oneline master..topic
7011dcf C4
46908d0 C3
```

The documentation says
that these commits are
stashed^[I don't know that rebase actually uses the same
mechanism as the stash command, but it seems plausible.]
in a temporary area.

!!! Excursus: dots

OK, seriously?
How does `master..topic` mean
_all the commits in `topic` that are not in `master`_?

Look at the graph again.
Where would you even put the dots in this?

``` text
            master
               |
C1---C2---C5---C6
      \
       C3---C4
            |
          topic
```

It turns out that
`master..topic`
is shorthand for
`^master topic`
which you can also write
`topic ^master`
which means
_all the commits in `topic` that are not in `master`_.

As long as we're here, imagine a repo
that looks like this:

``` text
             master
               |
C1---C2---C3---C4---C5---C6
                         |
                       topic
```

This is what the `git log` output looks like:

``` shell
$ git log --oneline --all --graph --decorate
* 0c1d724 (topic) C6
* 5d4cdb5 C5
* ca8cf0a (HEAD -> master) C4
* 019e663 C3
* b1ea04d C2
* 83fd5ca C1
```

To me, the `master..topic` notation
looks like _the commits from `master` to `topic`_.
And `git log` seems to confirm this:

``` shell
$ git log --oneline --graph --decorate master..topic
* 0c1d724 (topic) C6
* 5d4cdb5 C5

$ git log --oneline --graph --decorate  topic..master
<no output>
```

The point is, the dot notation is confusing.
But the other notation is clearer:
_commits in `topic` that are not in `master`_:

``` shell
$ git log --oneline --graph --decorate  topic '^master'
* 0c1d724 (topic) C6
* 5d4cdb5 C5
```

But the other way doesn't make sense:
_commits in `master` that aren't in `topic`_.

``` shell
$ git log --oneline --graph --decorate  '^topic' master
<no output>
```

And here's how to get each of the three segments
in a linear repo.
All of the commits from `topic`:

``` shell
$ git log --oneline --graph --decorate  topic
* 0c1d724 (topic) C6
* 5d4cdb5 C5
* ca8cf0a (HEAD -> master) C4
* 019e663 C3
* b1ea04d C2
* 83fd5ca C1
```

All of the commits in `master`:

``` shell
$ git log --oneline --graph --decorate master
* ca8cf0a (HEAD -> master) C4
* 019e663 C3
* b1ea04d C2
* 83fd5ca C1
```

All of the commits that are only in `topic`:

``` shell
$ git log --oneline --graph --decorate topic ^master
* 0c1d724 (topic) C6
* 5d4cdb5 C5
```
!!!

## Step 3: Reset the current branch

The man page goes on:

> The current branch is reset to `<upstream>`...
> This has the exact same effect as
> `git reset --hard <upstream>`
>
> `ORIG_HEAD` is set to
> point at the tip of the branch before the reset.

So we set the current branch to `master`,
and keep a reference to `topic` (previously the current branch)
in `ORIG_HEAD`.

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

Now things get interesting.

> The commits that were previously saved into the
> temporary area are then reapplied to the current
> branch, one by one, in order. Note that any
> commits in `HEAD` which introduce the same textual
> changes as a commit in `HEAD..<upstream>` are
> omitted (i.e., a patch already accepted upstream
> with a different commit message or timestamp will
> be skipped).
>
> It is possible that a merge failure will prevent
> this process from being completely automatic. You
> will have to resolve any such merge failure ...

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


git cherry-pick e44ff10
git cherry-pick --continue
git cherry-pick 83bb50b
git branch -m topic old_topic
git branch -m new_topic topic

---


git rebase upstream head
git rebase upstream branch
git rebase master topic
    tack topic onto the end of master


  ##  The ^0 ensures that if the variable is null
  ##  there will be an error
upstream=$(git-rev-parse --verify "$1^0")
branch=$(git-rev-parse --verify "${2-HEAD}^0")

git-checkout "$branch"

  ## find the common ancestor
  ## the merge base

mb=$(git-merge-base "$upstream" "$branch")

# Rewind the head to "$upstream"
git-reset --hard "$upstream"

# If the $other is a proper descendant of the tip of the branch, then
# we just fast forwarded.
if test "$mb" = "$branch"
then
	echo >&2 "Fast-forwarded $head to $other."
	exit 0
fi

git-format-patch -k --stdout --full-index "$upstream" ORIG_HEAD |
git am --binary -3 -k


---

$ git log --oneline --all --graph
* 9eee5c5 (HEAD -> master) C6
* 176d4bd C5
| * 02716e4 (topic) C4
| * 200a88e C3
|/
* 8e1930b C2
* 72f626c C1

$ git log --oneline --all --graph
* c7b3889 (HEAD -> topic) C4
* 09375bd C3
* 9eee5c5 (master) C6
* 176d4bd C5
* 8e1930b C2
* 72f626c C1

--- ### ddd

[master ]$ git log --oneline --all --graph
* a0b144d (HEAD -> master) C6
* 05c44b4 C5
| * 087e638 (topic) C4
| * eb92ba3 C3
|/
* ce5c802 C2
* 7a25e91 C1


[master ]$ git co topic
Switched to branch 'topic'

[topic ]$ git log --oneline --all --graph
* a0b144d (master) C6
* 05c44b4 C5
| * 087e638 (HEAD -> topic) C4
| * eb92ba3 C3
|/
* ce5c802 C2
* 7a25e91 C1

[topic ]$ git merge-base  master topic
ce5c802d4ce647133dbcc855f324ccd6f577bf40

[topic ]$ git reset --hard master
HEAD is now at a0b144d C6

[topic ]$ git log --oneline --all --graph
* a0b144d (HEAD -> topic, master) C6
* 05c44b4 C5
* ce5c802 C2
* 7a25e91 C1

[topic ]$ git rev-parse ORIG_HEAD
087e63822ea0ddd70b6af1e1237c3f85dffa5da6

[topic ]$ git format-patch -k --full-index --stdout master ORIG_HEAD | git am -3 -k
Applying: C1
Using index info to reconstruct a base tree...
Falling back to patching base and 3-way merge...
No changes -- Patch already applied.
Applying: C2
Using index info to reconstruct a base tree...
Falling back to patching base and 3-way merge...
CONFLICT (add/add): Merge conflict in file1
Auto-merging file1
Recorded preimage for 'file1'
error: Failed to merge in the changes.
Patch failed at 0002 C2
hint: Use 'git am --show-current-patch' to see the failed patch
When you have resolved this problem, run "git am --continue".
If you prefer to skip this patch, run "git am --skip" instead.
To restore the original branch and stop patching, run "git am --abort".


[topic *+|AM 2/6]$ vim file1

[topic *+|AM 2/6]$ git add file1


[topic |AM 2/6]$ git am --skip
Applying: C3
Using index info to reconstruct a base tree...
M	file1
Falling back to patching base and 3-way merge...
Auto-merging file1
CONFLICT (content): Merge conflict in file1
Recorded preimage for 'file1'
error: Failed to merge in the changes.
Patch failed at 0003 C3
  2 file1
hint: Use 'git am --show-current-patch' to see the failed patch
When you have resolved this problem, run "git am --continue".
If you prefer to skip this patch, run "git am --skip" instead.
To restore the original branch and stop patching, run "git am --abort".

[topic *+|AM 3/6]$ vim file1

[topic *+|AM 3/6]$ git add file1

[topic +|AM 3/6]$ git am --continue
Applying: C3
  3 file1
Recorded resolution for 'file1'.
Applying: C5
Using index info to reconstruct a base tree...
M	file1
Falling back to patching base and 3-way merge...
Auto-merging file1
CONFLICT (content): Merge conflict in file1
Recorded preimage for 'file1'
error: Failed to merge in the changes.
Patch failed at 0004 C5
hint: Use 'git am --show-current-patch' to see the failed patch
When you have resolved this problem, run "git am --continue".
If you prefer to skip this patch, run "git am --skip" instead.
To restore the original branch and stop patching, run "git am --abort".

[topic *+|AM 4/6]$ vim file1

[topic *+|AM 4/6]$ git add file1

[topic |AM 4/6]$ git am --skip
  3 file1
Applying: C4
Applying: C6
Using index info to reconstruct a base tree...
M	file1
Falling back to patching base and 3-way merge...
Auto-merging file1
CONFLICT (content): Merge conflict in file1
Recorded preimage for 'file1'
error: Failed to merge in the changes.
Patch failed at 0006 C6
hint: Use 'git am --show-current-patch' to see the failed patch
When you have resolved this problem, run "git am --continue".
If you prefer to skip this patch, run "git am --skip" instead.
To restore the original branch and stop patching, run "git am --abort".

[topic *+|AM 6/6]$ vim file1

[topic *+|AM 6/6]$ git add file1

[topic |AM 6/6]$ git am --skip

[topic ]$ git log --oneline --all --graph
* b065a47 (HEAD -> topic) C4
* 37166b7 C3
* a0b144d (master) C6
* 05c44b4 C5
* ce5c802 C2
* 7a25e91 C1
