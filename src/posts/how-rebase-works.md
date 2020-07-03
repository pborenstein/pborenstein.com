---
title: "Rebase: How does it work?"
summary:  Rebasing has always confused me.
          When it works, I'm a little surprised.
          So I decided to try rebasing
          by hand. It's pretty neat.
date: 2020-01-05T21-05:00
tags:
  - git
---

Do you find rebasing in Git confusing? I do.

{% from "macros/figure.njk" import figure %}
{{ figure("/assets/img/samuel-sianipar-scUBcasSvbE-unsplash.jpg",
"Photo by [Samuel Sianipar](https://unsplash.com/@samthewam24) • [Unsplash](https://unsplash.com)") }}

If you’re like me, you learned Git by looking at examples and memorizing a handful of Git commands.
Most of the time the commands do what I want,
but I don't always understand how and why they work.

I decided to figure out how rebase works
by doing it by hand.


!!! Refresher: what _does_ `git rebase` do?
Rebasing is one way of
["integrat[ing] changes from one branch into another."](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)

The typical use for `git rebase`
is to bring a topic branch
up to date with the master
branch and to continue
work on the topic branch
without merging.

Suppose we have a repo
that looks like this.
Some time ago, we created
the `topic` branch
off of commit `C2`.
In the meantime,
work on both `master` and `topic`
continued.

```
            master
               |
C1---C2---C5---C6
      \
       C3---C4
            |
          topic
```

Here's how `git log` draws the graph.

``` bash
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
end up looking like this.

```
            master
               |
C1---C2---C5---C6
                \
                 C3'---C4'
                       |
                     topic
```
!!!

The rebase command is invoked like this:

> ``` bash
> $ git rebase <upstream> <branch>
> ```

which means:

> Tack `<branch>`
> onto the end of
> `<upstream>`.
> If you don't specify `<branch>`,
> rebase uses the current branch.


## What we want to do

Assume our repo looks like this:

```
             HEAD
               |
            master (branch to rebase onto)
               |
C1---C2---C5---C6
      \
       C3---C4
            |
          topic (branch to rebase)
```

After running the rebase command:

> ``` bash#
> $ git rebase master topic
> ```

the repo will look like this:

```
            master
               |
C1---C2---C5---C6
                \
                 C3'---C4'
                       |
                     topic
                       |
                     HEAD
```

## Step by step

According to its
[man page](https://git-scm.com/docs/git-rebase),
rebase does its work in four steps:

1. Make the _branch to rebase_ the current branch.

    ``` bash
    $ git checkout topic
    Switched to branch 'topic'
    ```

    !!! Details
    The `git rebase` man page says:

    > If `<branch>` is specified, `git rebase` will perform
    > an automatic `git switch <branch>` before doing
    > anything else. Otherwise it remains on the current
    > branch.

    In our case,
    we switch to `topic`.

    ``` bash
    $ git checkout topic
    Switched to branch 'topic'

    * 6adbbb9 (master) C6
    * 88f76a2 C5
    | * ff2d8db (HEAD -> topic) C4
    | * c409bd6 C3
    |/
    * 1c74366 C2
    * f50bc06 C1
    ```

    In the ever-popular ASCII art format,
    our repo looks like this:

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
    !!!

2. Find the affected commits and save them:

    ``` bash
    $ git log --oneline master..HEAD
    ff2d8db C4
    c409bd6 C3
    $ git show -p c409bd6 > c3.patch
    $ git show -p ff2d8db > c4.patch
    ```

    !!! Details
    The man page goes on:

    > All changes made by commits in the current branch
    > but that are not in `<upstream>` are saved to a
    > temporary area. This is the same set of commits
    > that would be shown by <br>
    > `git log <upstream>..HEAD`…

    We need to find:

    - all the commits in the current branch, `topic`
    - that are not in the upstream branch, `master`

    These are the commits listed
    by the following command:[^ex]

    ``` bash
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

    ``` bash
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

    ``` bash
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
    !!!

3. Reset the _branch to rebase_
   to the _branch to rebase onto._
   That means setting `topic` (which is also the current branch)
   to the same commit as `master`.

    ``` bash
    $ git reset --hard master
    ```

    !!! Details
    The man page goes on:

    > The current branch is reset to `<upstream>`...
    > This has the exact same effect as
    > `git reset --hard <upstream>`
    >
    > `ORIG_HEAD` is set to
    > point at the tip of the branch before the reset.

    We save a reference to the current
    `HEAD` in `ORIG_HEAD`.^[Git sets `ORIG_HEAD`
    whenever `HEAD` changes. You don't have to set `ORIG_HEAD` yourself.]
    Next, we set the current branch, `topic`,
    to point to the same commit as `master`.^[You
    won't actually see `ORIG_HEAD` in the
    `git log` output. I put that in to make
    what's going on clearer.]

    ``` bash
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
                 topic
                   |
    C1---C2---C5---C6
          \
          C3---C4
               |
           ORIG_HEAD
    ```
    !!!



4. Apply the commits from step 2 to the current branch

    ``` bash
    $ git apply -3 c3.patch
    $ git commit -m "C3"
    [topic 4cb79ee] C3
    1 file changed, 1 insertion(+)

    $ git apply -3 c4.patch
    $ git commit -m "C4'"
    [topic 029ede0] C4
    1 file changed, 1 insertion(+)
    create mode 100644 file2
    ```

    !!! Details
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

    This is the state of our repo before
    any patches are applied.

    ``` bash
    $ git log --oneline --graph --decorate --all
    * 6adbbb9 (HEAD -> topic, master) C6
    * 88f76a2 C5
    | * ff2d8db (ORIG_HEAD) C4
    | * c409bd6 C3
    |/
    * 1c74366 C2
    * f50bc06 C1
    ```

    We apply the first patch for the `C3` commit:^[You
    might notice the text `Applied patch to 'file1' with conflicts.`
    and then the text `Resolved 'file1' using previous resolution.`
    There is a conflict in this patch
    that I had resolved earlier.
    I have [`rerere`](https://git-scm.com/docs/git-rerere)
    enabled, so Git remembers how I resolved the
    conflict the first time and does it again.]

    ``` bash
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

    And now we apply the `C4` commit:

    ``` bash
    $ git apply -3 c4.patch
    <no output>
    $ git commit -m "C4'"
    [topic 703d475] C4'
    1 file changed, 1 insertion(+)
    create mode 100644 file2
    ```
    !!!

This is how things end up:

``` bash
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
C1---C2---C5---C6
      \         \
      C3---C4    C3'---C4'
           |           |
       ORIG_HEAD     topic
                       |
                     HEAD
```

Which is exactly the same as if
we had used `git rebase`.


[^ex]: Another way of writing

    ``` bash
    $ git log --oneline master..topic
    ```

    is like this, which I find clearer:

    ``` bash
    $ git log --oneline ^master topic
    ```
