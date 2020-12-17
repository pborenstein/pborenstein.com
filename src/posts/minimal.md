---
title: Making a Minimal Repo
summary:  I want this repo to only ever
          have three commits.
date: 2020-08-25T21-05:00
tags:
  - git
---


Starting point:

```bash
[micro ]$ git log --oneline --graph --all
* a451940 (minimal, main) Minimal = Tiny + collections, js, data, partials, icons
* d4996cc (tiny) Tiny = Micro + layouts, src
* f636ea3 (HEAD -> micro, root) Micro = base .eleventy.js one content file
```

the ever-popular ASCII diagram:

```text
  root                    main
    |                       |
  micro      tiny        minimal
    |          |            |
    |          |            |
f636ea3 --  -> d4996cc ---> a451940
    |
    |
  HEAD
```

The first commit `micro` has
a bad commit message:

```bash
[micro =]$ git log micro
commit f636ea3f0c7b066abc658734ef47c05f98bd9996 (HEAD -> micro, origin/micro, root)
Author: Philip Borenstein <pborenstein@gmail.com>
Date:   Fri Aug 21 02:47:26 2020 -0400

    Micro = base .eleventy.js one content file

    A "hello, world" organized to grow:

        ./.eleventy.js -- sets up directory structure
        ./src/index.md -- a header and some text

    Micro = base .eleventy.js one content file

    A "hello, world" organized to grow:

        ./.eleventy.js -- sets up directory structure
        ./src/index.md -- a header and some text

    Add README
```

We want to get rid of the double description
and "Add READNE"

Our `HEAD` is at `micro`
and `micro` is the commit we want to edit


```bash
[micro ]$ git commit --amend
```

This opens your editor, vim in this case,
to the commit message we're amending:

```vim
1   Micro = base .eleventy.js one content file
  1
  2 A "hello, world" organized to grow:
  3
  4     ./.eleventy.js -- sets up directory structure
  5     ./src/index.md -- a header and some text
  6
  7 Micro = base .eleventy.js one content file
  8
  9 A "hello, world" organized to grow:
 10
 11     ./.eleventy.js -- sets up directory structure
 12     ./src/index.md -- a header and some text
 13
 14 Add README
 15
 ```

We clean up the message and save.

This happens.

```bash
[micro ]$ git commit --amend
# the editing happened here
Auto packing the repository in background for optimum performance.
See "git help gc" for manual housekeeping.
[micro ebeb1a8] Micro = base .eleventy.js one content file
 Date: Fri Aug 21 02:47:26 2020 -0400
 5 files changed, 146 insertions(+)
 create mode 100644 .eleventy.js
 create mode 100644 .gitignore
 create mode 100644 README.md
 create mode 100644 package.json
 create mode 100644 src/index.md
 ```

Looks like it worked. Let's look at the tree

```bash
[micro ]$ git log --oneline --graph --all
* ebeb1a8 (HEAD -> micro) Micro = base .eleventy.js one content file
* a451940 (minimal, main) Minimal = Tiny + collections, js, data, partials, icons
* d4996cc (tiny) Tiny = Micro + layouts, src
* f636ea3 (root) Micro = base .eleventy.js one content file
```

The `--oneline` format is hiding the fact that
commit `ebeb1a8` is **not** the child of `a451940`.
If we use `--format=short`, we can see that
`ebeb1a8` is an orphan just floating in space.


```bash
[micro ]$ git log --format=short --decorate --graph --all
* commit ebeb1a8652e299a2f4093d7c56056099c6836b19 (HEAD -> micro)
  Author: Philip Borenstein <pborenstein@gmail.com>

      Micro = base .eleventy.js one content file

* commit a4519408b52bc75cce1f5dff461c4dc02e59dcf3 (minimal, main)
| Author: Philip Borenstein <pborenstein@gmail.com>
|
|     Minimal = Tiny + collections, js, data, partials, icons
|
* commit d4996cca371b6418942e160fe5fa86ae89ad531b (tiny)
| Author: Philip Borenstein <pborenstein@gmail.com>
|
|     Tiny = Micro + layouts, src
|
* commit f636ea3f0c7b066abc658734ef47c05f98bd9996 (root)
  Author: Philip Borenstein <pborenstein@gmail.com>

      Micro = base .eleventy.js one content file

```

So our current state is this.


```text
  micro
    |
    |
 ebeb1a8
    |
    |
  HEAD


                           main
                             |
  root        tiny        minimal
    |           |            |
    |           |            |
f636ea3 ---> d4996cc ---> a451940
```

What we want to do now is to attach
the `minimal` branch to the end of `micro`

So it looks like we want to tack `micro`
to the end of micro:

```bash
[micro ]$ git rebase micro minimal
Successfully rebased and updated refs/heads/minimal.
```

OK, what does that mean?

Remember that `--oneline` doesn't let
you see that two commits aren't related.
The `--show-linear-break` option solves
that (but it doesn't work with `--graph`).

```bash
[minimal ]$ git log --oneline --show-linear-break --all
7c128d4 (HEAD -> minimal) Minimal = Tiny + collections, js, data, partials, icons
25aaa80 Tiny = Micro + layouts, src
ebeb1a8 (micro) Micro = base .eleventy.js one content file

                    ..........
a451940 (main) Minimal = Tiny + collections, js, data, partials, icons
d4996cc (tiny) Tiny = Micro + layouts, src
f636ea3 (root) Micro = base .eleventy.js one content file
```

That looks like this:

```text
 micro                    minimal
   |                         |
   |                         |
ebeb1a8 ---> 25aaa80 ---> 7c1v8d4
                             |
                             |
                           HEAD


  root        tiny         main
    |           |            |
    |           |            |
f636ea3 ---> d4996cc ---> a451940
```

The upper tree is the new (corrected) tree.
The lower tree is the old tree.

Rebasing took care of pointing
`micro` and `minimal` to the right commits.

Now we just need to move the other
three branches to the right commits.
`main` and `root` are straightforward:
make this look like that.

```bash
[minimal ]$ git branch -f main minimal
[minimal ]$ git branch -f root micro
```

Instead of using a specific SHA (`25aaa80`) for `tiny`,
we'll describe the commit relative to `minimal`:

```bash
[minimal ]$ git branch -f tiny 'minimal^'
```

This is what the log looks like:

```bash
[minimal ]$ git log --oneline --show-linear-break --all
7c128d4 (HEAD -> minimal, main) Minimal = Tiny + collections, js, data, partials, icons
25aaa80 (tiny) Tiny = Micro + layouts, src
ebeb1a8 (root, micro) Micro = base .eleventy.js one content file
```

And this is what that looks like:

```text
 root                      main
   |                         |
 micro        tiny        minimal
   |            |            |
   |            |            |
ebeb1a8 ---> 25aaa80 ---> 7c1v8d4
                             |
                             |
                           HEAD


f636ea3 ---> d4996cc ---> a451940
```

The old commits hang around until
they're garbage collected.
If we wanted to be able to get
back to our original versions,
we could point a branch at
`a451940` and get back the entire
state of our tree when we started.

```bash
[minimal ]$ git branch -f rescue a451940

[minimal ]$ git log --oneline --show-linear-break --all
7c128d4 (HEAD -> minimal, main) Minimal = Tiny + collections, js, data, partials, icons
25aaa80 (tiny) Tiny = Micro + layouts, src
ebeb1a8 (root, micro) Micro = base .eleventy.js one content file

                    ..........
a451940 (rescue) Minimal = Tiny + collections, js, data, partials, icons
d4996cc Tiny = Micro + layouts, src
f636ea3 Micro = base .eleventy.js one content file
```

