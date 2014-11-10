---
layout: post
title:  "[TIP]:Chrome devtool - Copy as cURL"
date:   2014-11-10 10:50:00
categories:  cat2
---

# When you may need it

You want to download some content of some sites, you don't have some sniffer at hand. Now Chrome devtool can help.

### 1. open the Chrome devtool, select the `Network` tab
### 2. find the content your want to download, *right* click it
### 3. choose `Copy as cURL`
### 4. open your terminal,paste in

you will find that Chrome have filled all the `HEADER`s your need to run the `curl` to download from the site.

P.S.

	don't forget to add `-O` or `-o` to name the downloaded file name.

##Happy hacking.

EOF
