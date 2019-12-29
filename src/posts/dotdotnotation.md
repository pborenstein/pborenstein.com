---
title: Dot Dot Notation
summary: Dot notation lets you specify sets of commits.
tags:
  - git
  - learning
---

OK, seriously?
What is it with the dot notation in git?
Given this repo:

```
             master
               |
C1---C2---C5---C6
      \
       C3---C4
            |
          topic
```

How does
> `git log master..topic`

mean to display commits `C3` and `C4`?

Let's  see if we can make things
simpler.

## A simple case

Imagine a repo with two branches,
`master` and `topic`.
The `topic` branch branches off
of `master`, but there are
no new commits on `master`:


```
             master
               |
L1---L2---L3---L4---L5---L6
                         |
                       topic
```

The `git log` output looks like this:

``` shell-session
$ git log --oneline --all --graph --decorate
* 0c1d724 (topic) L6
* 5d4cdb5 L5
* ca8cf0a (HEAD -> master) L4
* 019e663 L3
* b1ea04d L2
* 83fd5ca L1
```

What should
we expect
the output of
`git log master..topic` to be?

``` shell-session
$ git log --oneline --graph --decorate master..topic
* 0c1d724 (topic) L6
* 5d4cdb5 L5
```

That looks right. The commits from
`master` to `topic`
are `L5` and `L6`
(not including the `L6` commit at `master`).

OK. What if we reverse the
order of the commits?

``` shell-session
$ git log --oneline --graph --decorate topic..master
<no output>
```

Order matters. The dots seem to denote
the passage of time.
So
`master..topic` means:

>_The commits from `master` to `topic`_.^[Not
including the `master` commit itself.]

Then it makes sense that `topic..master` 
produces no output because

>_the commits from `topic` to `master`_

is nonsensical
since `topic` comes after `master`.



## Now with branches

Let's go back to our first repo:

```
             master
               |
C1---C2---C5---C6
      \
       C3---C4
            |
          topic
```

What does `git log master..topic`,
mean in this case? _Commits from `master` to `topic`_
doesn't make a lot of sense here.

It turns out that
> `master..topic`

is
[shorthand](https://git-scm.com/docs/gitrevisions#_dotted_range_notations)
for
> `^master topic`


See, `git log`
doesn't work on
sequences of commits.
It works on _sets_
of commits.
It's right there
[in the documentation](https://git-scm.com/docs/gitrevisions#_specifying_ranges).^[If you're
like me, you learned Git by
looking at examples and
memorizing a handful of Git commands
that you use
as magic incantations.
This post is part of my
trying to understand
what these magic
spells mean.]

> History-traversing commands, such as `git log`,
> operate on a set of commits, not just a single
> commit.
> 
> For these commands, specifying a single revision,
> using the notation described in the previous
> section, means the set of commits reachable from
> the given commit.
> 
> A commit’s reachable set is the commit itself and
> the commits in its ancestry chain.

So `master..topic` means `^master topic`,
which means:

- All the commits on `topic`:

  ```
  C1---C2---C3---C4
  ```

- Excluding all the commits on `master`:

  ```
  C1---C2---C5---C6
  ```

- Which leaves:

  ```
  C3---C4
  ```

``` shell-session
$ git log --oneline --graph --decorate master..topic
* 703d475 (HEAD -> topic) C4
* 3ffdcab C3
```


