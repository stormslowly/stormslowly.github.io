---
layout: post
title:  "[afterCode]sort the expresse router, please"
date:   2015-10-26 10:50:00
categories:  afterCode node.js
---


## a very stupid Bug

```javascript
var bugRouter = express.Router()

var helloAll = function (req, res) {
  res.send(req.params.name)
}
var helloBaby = function (req, res) {
  res.send('you are always my baby')
}

bugRouter.get('/hello/:name', helloAll)
bugRouter.get('/hello/baby', helloBaby)

app.use(bugRouter)
```


```bash
$curl 127.0.0.1:3000/hello/baby
baby
```

显然你想调用 `helloBaby`, 但是因为路由书写的顺序，让`helloAll`先截获了请求

### Sublime Text中的解决
1. 选中需要排序的路由行
2. `Edit` -> `Sort Lines(Case Sensitive)`
3. `Edit` -> `Permute Line` -> `Reverse`

如此折腾之后，路由信息就能按照我的预期来了。当项目中路由配置很多的时候，这个小技巧还是很有用的。









