var concurrent = require('../')
var test = require('tape')

test('empty tasks array', function (t) {
  t.plan(1)

  concurrent(1, [], function (err) {
    t.error(err)
  })
})

test('empty tasks object', function (t) {
  t.plan(1)

  concurrent(1, {}, function (err) {
    t.error(err)
  })
})

test('empty tasks array and no callback', function (t) {
  concurrent(1, [])
  t.pass('did not throw')
  t.end()
})

test('empty tasks object and no callback', function (t) {
  concurrent(1, {})
  t.pass('did not throw')
  t.end()
})
