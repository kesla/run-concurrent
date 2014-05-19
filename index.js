module.exports = function (limit, tasks, cb) {
  var results, pending, keys, next = limit
  if (Array.isArray(tasks)) {
    results = []
    pending = tasks.length
  } else {
    keys = Object.keys(tasks)
    results = {}
    pending = keys.length
  }

  function done (i, err, result) {
    results[i] = result

    if (--pending === 0 || err) {
      cb && cb(err, results)
      cb = null
    } else if (!err && next < tasks.length) {
      next++
      // object
      if (keys)
        tasks[keys[next - 1]](done.bind(undefined, keys[next - 1]))
      else
        tasks[next - 1](done.bind(undefined, next - 1))
    }
  }

  if (!pending) {
    // empty
    cb && cb(null, results)
    cb = null
  } else if (keys) {
    // object
    keys.slice(0, limit).forEach(function (key) {
      tasks[key](done.bind(undefined, key))
    })
  } else {
    // array
    tasks.slice(0, limit).forEach(function (task, i) {
      task(done.bind(undefined, i))
    })
  }
}
