# run-concurrent [![travis](https://img.shields.io/travis/kesla/run-concurrent.svg)](https://travis-ci.org/kesla/run-concurrent) [![npm](https://img.shields.io/npm/v/run-concurrent.svg)](https://npmjs.org/package/run-concurrent)

### Run an array of functions concurrently, with a maximum of active tasks

![concurrent](https://raw.githubusercontent.com/feross/run-parallel/master/img.png) [![browser support](https://ci.testling.com/kesla/run-concurrent.png)](https://ci.testling.com/kesla/run-concurrent)

### install

```
npm install run-concurrent
```

### Kudos

This is basically a fork of [run-parallel](http://npmjs.org/package/run-parallel) by [feross](http://github.com/feross/) with added limit

### usage

#### concurrent(tasks, limit, [callback])

Run the `tasks` array of functions concurrently, without waiting until the previous
function has completed. If any of the functions pass an error to its callback, the main
`callback` is immediately called with the value of the error. Once the `tasks` have
completed, the results are passed to the final `callback` as an array.

It is also possible to use an object instead of an array. Each property will be run as a
function and the results will be passed to the final `callback` as an object instead of
an array. This can be a more readable way of handling the results.

##### arguments

- `limit` - The maximum number of tasks to run at any time.
- `tasks` - An array or object containing functions to run. Each function is passed a
`callback(err, result)` which it must call on completion with an error `err` (which can
be `null`) and an optional `result` value.
- `callback(err, results)` - An optional callback to run once all the functions have
completed. This function gets a results array (or object) containing all the result
arguments passed to the task callbacks.

##### example

```js
var concurrent = require('run-concurrent')

// run at most 2 things simultaneously
concurrent(2, [
  function (callback) {
    setTimeout(function () {
      callback(null, 'one')
    }, 200)
  },
  function (callback) {
    setTimeout(function () {
      callback(null, 'two')
    }, 100)
  },
  function (callback) {
    setTimeout(function () {
      callback(null, 'three')
    }, 300)
  }
],
// optional callback
function (err, results) {
  // the results array will equal ['one','two'] even though
  // the second function had a shorter timeout.
})
```

This module is basically equavalent to
[`async.parallelLimit`](https://github.com/caolan/async#parallellimittasks-limit-callback), but it's
handy to just have the one function you need instead of the kitchen sink. Modularity!
Especially handy if you're serving to the browser and need to reduce your javascript
bundle size.

Works great in the browser with [browserify](http://browserify.org/)!

### see also

- [run-auto](https://github.com/feross/run-auto)
- [run-series](https://github.com/feross/run-series)
- [run-waterfall](https://github.com/feross/run-waterfall)

### license

MIT. Copyright (c) [David Björklund](http://github.com/kesla) & [Feross Aboukhadijeh](http://feross.org).
