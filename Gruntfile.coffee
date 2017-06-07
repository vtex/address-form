GruntVTEX = require 'grunt-vtex'

module.exports = (grunt) ->
  pkg = grunt.file.readJSON 'package.json'

  config = GruntVTEX.generateConfig grunt, pkg, {}

  process.env.NODE_ENV = 'production'
  require('babel-register')
  webpackConfg = require('./webpack.config.babel.js')

  config.webpack =
    options: webpackConfg
    dist:
      cache: false

  config.shell.defaultTask =
    command: "echo Please run 'npm start'"
  config.shell.build =
    command: "npm run dist"

  tasks =
    default: ['shell:defaultTask']
    test: []
    dist: ['webpack']
    vtex_deploy: ['shell:cp']

  # Project configuration.
  grunt.initConfig config
  grunt.loadNpmTasks name for name of pkg.devDependencies when name[0..5] is 'grunt-' and name isnt 'grunt-vtex'
  grunt.registerTask taskName, taskArray for taskName, taskArray of tasks
