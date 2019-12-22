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

```
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

``` shell-session
$ git log --oneline --all --graph --decorate
* 6adbbb9 (master) C6
* 88f76a2 C5
| * ff2d8db (HEAD -> topic) C4
| * c409bd6 C3
|/  
* 1c74366 C2
* f50bc06 C1
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

```
            master
               |
C1---C2---C5---C6--C3---C4
                        |
                      topic
                        |
                      HEAD
```

!!! Well, actually…
We're not really _moving_
the commits.
We're making new
identical commits
on a different branch.
Moreover,
it's possible
that commits
`C3` and `C4`
introduce conflicts with
`C5` and `C6`
(the commits that were made
while we were working on `topic`).
So the `C3` and `C4` commits
that we tack on to the end of `C6`
will be different.
The end result is this,
where `C3'` is like `C3` but possibly with some changes.

```
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

``` shell-session
$ git rebase <upstream> <branch>
```

which means:

> Tack `branch`
> onto the end of
> `upstream`.
> If you don't specify `branch`,
> rebase uses the current branch.

This is the command we're using:

``` shell-session
$ git rebase master topic
```

According to its
[man page](https://git-scm.com/docs/git-rebase),
rebase does its work in four steps:

1. Switch to the branch that you want to move
2. Find the commits that need to move
3. Switch to the branch that will receive the commits.
4. Apply the commits from step 2 to the current branch

The following sections
give the details about each step.

## Step 1: Switch branches

The `git rebase` man page says:

> If `<branch>` is specified, `git rebase` will perform
> an automatic `git switch <branch>` before doing
> anything else. Otherwise it remains on the current
> branch.

In our case,
we switch to `topic`:

```
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

- all the commits in the current branch, `topic`
- that are not in the upstream branch, `master`

These are the commits listed
by the following command:[^ex]

[^ex]: Which is the same as

    ``` shell-session
    $ git log --oneline ^master topic
    ```
    
``` shell-session
$ git log --oneline master..topic
ff2d8db C4
c409bd6 C3
```

The man page says
that these commits are
stashed in a temporary area.
I'm not sure what Git does,
but we'll save the two commits
into `.patch` files.

First the `C3` commit:

``` shell-session
$ git show -p c409bd6 | tee c3.patch
commit c409bd679e63fe351023d27b8050c7d1ec538128
Author: Philip Borenstein <pborenstein@gmail.com>
Date:   Wed Dec 11 06:25:03 2019 -0500

    C3

diff --git a/file1 b/file1
index e212970..0a7d80e 100644
--- a/file1
+++ b/file1
@@ -1 +1,2 @@
 file1
+filemore
```

Now the `C4` commit:

``` shell-session
$ git show -p ff2d8db | tee c4.patch
commit ff2d8db733d8e0d4ef5c6c375345c3e424916be2
Author: Philip Borenstein <pborenstein@gmail.com>
Date:   Wed Dec 11 06:25:03 2019 -0500

    C4

diff --git a/file2 b/file2
new file mode 100644
index 0000000..deba01f
--- /dev/null
+++ b/file2
@@ -0,0 +1 @@
+something
```

## Step 3: Switch to the upstream branch

The man page goes on:

> The current branch is reset to `<upstream>`...
> This has the exact same effect as
> `git reset --hard <upstream>`
>
> `ORIG_HEAD` is set to
> point at the tip of the branch before the reset.

First we set current branch to
the same commit as `master`,
and keep a reference to
the branch we were on (`topic`)
in `ORIG_HEAD`.^[Git sets `ORIG_HEAD` whenever `HEAD` changes.
You don't have to set `ORIG_HEAD` yourself.]

``` shell-session
$ git reset --hard master
HEAD is now at 6adbbb9 C6

$ git log --oneline --graph --decorate --all
* 6adbbb9 (HEAD -> topic, master) C6
* 88f76a2 C5
| * ff2d8db (ORIG_HEAD) C4
| * c409bd6 C3
|/
* 1c74366 C2
* f50bc06 C1
```

Here's some ASCII art:

```
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

The man page continues:

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
to the current branch.

``` shell-session
$ git log --oneline --graph --decorate --all
* 6adbbb9 (HEAD -> topic, master) C6
* 88f76a2 C5
| * ff2d8db (ORIG_HEAD) C4
| * c409bd6 C3
|/
* 1c74366 C2
* f50bc06 C1
```

We apply the first patch for th `C3` commit:^[You
might notice the text `Applied patch to 'file1' with conflicts.`
and then the text `Resolved 'file1' using previous resolution.`
There is a conflict in this patch
that I had resolved earlier.
I have [`rerere`](https://git-scm.com/docs/git-rerere)
enabled, so Git remembers how I resolved the
conflict the first time and does it again.]

``` shell-session
$ git apply -3 c3.patch
error: patch failed: file1:1
Falling back to three-way merge...
Applied patch to 'file1' with conflicts.
U file1
Resolved 'file1' using previous resolution.

$ git add file1
<no output>
$ git commit -m "C3'"
[topic 3ffdcab] C3'
 1 file changed, 1 insertion(+)
```

And now the `C4` commit:

``` shell-session
$ git apply -3 c4.patch
<no output>
$ git commit -m "C4'"
[topic 703d475] C4'
 1 file changed, 1 insertion(+)
 create mode 100644 file2
```

This is how things end up:

``` shell-session
$ git log --oneline --graph --decorate --all
* 703d475 (HEAD -> topic) C4'
* 3ffdcab C3'
* 6adbbb9 (master) C6
* 88f76a2 C5
| * ff2d8db (ORIG_HEAD) C4
| * c409bd6 C3
|/
* 1c74366 C2
* f50bc06 C1
```

Or in ASCII art:

```
            master
               |
C1---C2---C5---C6--C3'---C4'
     \                  |
      C3--C4          topic
          |             |
      ORIG_HEAD        HEAD
```

And that's what we want.



[^ex]: Another way of writing

    ``` shell-session
    $ git log --oneline master..topic
    ```

    is like this, which I find clearer:

    ``` shell-session
    $ git log --oneline ^master topic
    ```

