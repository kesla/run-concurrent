var concurrent = require('../')
var test = require('tape')

test('functions run concurrent', function (t) {
  t.plan(4)

  var tasks = [
    function (cb) {
      t.pass('cb 1')
      cb(null)
    },
    function (cb) {
      t.pass('cb 2')
      cb(null)
    },
    function (cb) {
      t.pass('cb 3')
      cb(null)
    }
  ]

  concurrent(3, tasks, function (err) {
    t.error(err)
  })
})

test('functions that return results', function (t) {
  t.plan(4)

  var tasks = [
    function (cb) {
      t.pass('cb 1')
      cb(null, 1)
    },
    function (cb) {
      t.pass('cb 2')
      cb(null, 2)
    }
  ]

  concurrent(3, tasks, function (err, results) {
    t.error(err)
    t.deepEqual(results, [1, 2])
  })
})

test('functions that return results preserve order', function (t) {
  t.plan(4)

  var tasks = [
    function (cb) {
      setTimeout(function () {
        t.pass('cb 1')
        cb(null, 1)
      }, 200)
    },
    function (cb) {
      setTimeout(function () {
        t.pass('cb 2')
        cb(null, 2)
      }, 100)
    }
  ]

  concurrent(3, tasks, function (err, results) {
    t.error(err)

    // 2 should be second, even though it gets returned first
    t.deepEqual(results, [1, 2])
  })
})

test('functions run concurrent', function (t) {
  t.plan(5)

  var finished = 0,
    tasks = [
    function (cb) {
      setTimeout(function () {
        finished = finished + 1
        t.pass('cb 1')
        cb(null)
      }, 1)
    },
    function (cb) {
      setTimeout(function () {
        finished = finished + 1
        t.pass('cb 2')
        cb(null)
      }, 100)
    },
    function (cb) {
      t.pass('cb 3')
      t.equal(finished, 1)
      cb(null)
    }
  ]

  concurrent(2, tasks, function (err) {
    t.error(err)
  })
})

test('function run series when limit = 1', function (t) {
  t.plan(3)

  var order = 0,
    tasks = [
    function (cb) {
      t.equal(order, 0)
      order++
      cb(null, 1)
    },
    function (cb) {
      t.equal(order, 1)
      order++
      cb(null, 2)
    }
  ]

  concurrent(1, tasks, function (err) {
    t.error(err)
  })
})