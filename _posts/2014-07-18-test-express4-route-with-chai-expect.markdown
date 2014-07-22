---
layout: post
title:  "unit test express4 route with chai.expect"
date:   2014-03-05 12:50:12
categories: unittest chai expect
---

`product.js`

``` js
'use strict';
var express = require('express');
var router = express.Router();

router.use('/status', function(req, res) {
  res.json({ status: 'OK' });
});

module.exports = router;
```

`testProdcut.js`

``` js
var status = require('product.js');

...

it('should hanld the status',function(){
  status.handle(
    {url:'/status',method:'GET'},
    { json: function(obj){
        expect(obj).to.deep.equal({status:'NOTOK'});
        done();
      }
    });
  });

});


```

the result:

```
  test
    1) should handle the status


  0 passing (13ms)
  1 failing

  1) test should hanld the status:
     TypeError: undefined is not a function
...
```


The error message the `undefined is not a function` really make me confuse, after a little read express4's code it seem no error handling in res.json or res.end;

here is my work around

`resExpect.js`

``` js
'use strict';
var expect = require('chai').expect;

var expectStatus = function (expectCode, done) {
  return function (statusCode) {
    try {
      expect(statusCode).to.equal(expectCode);
      done();
    } catch (e) {
      done(e);
    }
  };
};

var expectJSON = function (expectJSON, done) {
  return function (actualJSON) {
    try {
      expect(actualJSON).to.deep.equal(expectJSON);
      done();
    } catch (e) {
      done(e);
    }
  };
};

exports.expectStatus = expectStatus;
exports.expectJSON = expectJSON;
```

`newtestProdcut.js`

``` js
var status = require('product.js');
var resPxpect = require('resExpect.js');
...

it('should hanld the status',function(){
  status.handle(
    {url:'/status',method:'GET'},
    { json:  resExpect.expectJSON({ status: 'NOTOK' }],done);
    });
  });
});


```


hope it helps :*p
