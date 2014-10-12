---
layout: post
title:  "Number to Hex in JavaScript "
date:   2014-10-12 12:50:12
categories: javascript
---

## Hex String

Sometimes, Hex is usefull when debuging some value.
Usually, we use the `toString` method of Number.

```js
(255).toString(16) // 'ff'
(55).toString(16)  // '37'
```
But when it's negative value, it failed.

```js
(-1).toString(16) // '-1'
```

## Bitwise Operation `>>>`

`zero-fill right shift` (`>>>`)is a nice solution to get the hex expresstion of negative value.

### zero-fill right shift
>This operator shifts the first operand the specified number of bits to the right. Excess bits shifted off to the right are discarded. Zero bits are shifted in from the left. The sign bit becomes 0, so the result is always non-negative.

As it's description, if we do `number>>>0`, nothing will change to the value of the number; but if it's a negative number, it will add new sign bit to it, so we can get the complement of the negative value, now we can use the `toString(radix)` method.

```js
function toHex(num){
  return (num>>>0).toString(16);
}

toHex(255) // 'ff'
toHex(55)  // '37'
toHex(-1)  // 'ffffffff'

```
---

End
