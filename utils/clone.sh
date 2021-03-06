#! /usr/bin/env bash

# from https://stackoverflow.com/a/50996201/285528

git clone --depth 1 --origin source   git@github.com:pborenstein/fresh.git  pb.frish

cd pb.frish

START_COMMIT=$(git rev-list master|tail -n 1)
# 7167a7106284e9663cb170bc612e6df9c0ca6786

git checkout $START_COMMIT
# detached head 

git checkout --orphan temp
git commit -m "Initial commit"
# lots of output everything being brought into temp 

git rebase --onto temp $START_COMMIT master

hub create pb.frish 

# $ git remote -v
# origin	git@github.com:pborenstein/pb.frish.git (fetch)
# origin	git@github.com:pborenstein/pb.frish.git (push)
# source	git@github.com:pborenstein/fresh.git (fetch)
# source	git@github.com:pborenstein/fresh.git (push)


git push -u origin master

######################

change tempplate

[master =]$ git fetch source
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
From github.com:pborenstein/fresh
   8f2b664..d13b9c5  master     -> source/master
   
philip@ningal: ~/projects/pb.frish
[master =]$ git merge source/master --allow-unrelated-histories
CONFLICT (add/add): Merge conflict in README.md
Auto-merging README.md
Recorded preimage for 'README.md'
Automatic merge failed; fix conflicts and then commit the result.
