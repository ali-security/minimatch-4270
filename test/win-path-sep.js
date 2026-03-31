var tap = require('tap')
var Module = require('module')

// Re-load minimatch with a mocked path module that has Windows separator
var mmPath = require.resolve('../')
delete require.cache[mmPath]

var origLoad = Module._load
Module._load = function (request, parent, isMain) {
  if (request === 'path') return { sep: '\\' }
  return origLoad.call(this, request, parent, isMain)
}

var mm = require('../')
Module._load = origLoad

tap.equal(mm('x\\y\\z', 'x/y/*/z'), false)
tap.equal(mm('x\\y\\w\\z', 'x/y/*/z'), true)
