---
layout: post
title:  "how to install jsbin in windows"
date:   2014-02-14 12:50:12
categories: nodejs jsbin
---

[Jsbin][jsbinurl] is a [jsFiddle][jsfiddleurl] like service.
It can be installed in local, but have lot of problems in windows.

``npm install jsbin -g``
	may(must) have serval problemes, we must install it manually.

###Clone jsbin
```
git clone https://github.com/jsbin/jsbin.git
cd jsbin
```
###solve sqlite compile error

#####config jsbin to use mysql adapter instead of sqlite
in file ``config.default.json``,change ``"adapter": "sqlite",`` to ``"adapter": "mysql",``
and don't forget to edit the mysql configure below.

```
"mysql": {
  "host": "localhost",
  "user": "root",
  "password": "Change to your Password",
  "database": "jsbin",
  "charset": "utf8mb4",
  "collate": "utf8mb4_unicode_ci"
}
```

##### remove sqlite dependency
in ``package.json`` remove line `    "sqlite3": "~2.1.19",`

### install jsbin locally
```
cd ..
npm install jsbin -g
```
### fix replify bug
in your `NODE_PATH` find `jsbin\node_modules\replify\replify.js`
line 94 from 96
```
if (err && err.code !== 'EEXIST') {
  return logger.error('error making repl directory: ' + replPath, err)
}
```
change `replPath` to `options.replPath`

### init mysqldb config

```
cd jsbin/build
mysql -uroot -p < full-db-v3.mysql.sql
```
### enjoy jsbin

```
> jsbin
Loaded custom config: Code Club World
Loaded custom config: Ember.js
Loaded custom config: Seb Lee-Delise
JS Bin v3.10.7 is up and running on port 3000. Now point your browser at http://localhost:3000
repl server error { [Error: listen EACCES] code: 'EACCES', errno: 'EACCES', syscall: 'listen' }
```
go to [localhost:3000](http://127.0.0.1:3000)


## Refs

* [1 https://gist.github.com/remy/3236634](https://gist.github.com/remy/3236634 )
* [2 https://github.com/jsbin/jsbin/issues/353#issuecomment-30627120](https://github.com/jsbin/jsbin/issues/353#issuecomment-30627120)

[jsbinurl]: http://jsbin.com/
[jsfiddleurl]: http://jsfiddle.net/

