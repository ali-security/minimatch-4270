var tap = require('tap')
var Module = require('module')

// Re-load minimatch with a mocked path module that returns null (simulates missing path module)
var mmPath = require.resolve('../')
delete require.cache[mmPath]

var origLoad = Module._load
Module._load = function (request, parent, isMain) {
  if (request === 'path') return null
  return origLoad.call(this, request, parent, isMain)
}

var mm = require('../')
Module._load = origLoad

tap.equal(mm.sep, '/')
