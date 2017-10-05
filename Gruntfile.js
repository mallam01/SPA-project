
/*global require*/

module.exports = function (grunt) {
  'use strict';
  require('time-grunt')(grunt);
  //var modules = [];
  /*    * Simplify Gruntfile using load-grunt-tasks module    
        * See https://github.com/sindresorhus/load-grunt-tasks    
  */
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  grunt.initConfig({        
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9083,
          hostname: '0.0.0.0',
          livereload: 35729,
          base: 'dist',
          open: false                
        }            
      }        
    },
    watch: {
      options: {
        livereload: true,
        interval: 5007
        },
        everything: {
          files: ['src/**/*'],
          tasks: ['build']
        }        
    },
    concat: {
      options: {},
      myapp: {
        src: ['src/js/*.js'],
        dest: 'dist/js/sandbox.js'
      }        
    },
    copy: {
      css: {
        cwd: 'src/css',
        expand: true,
        nonull: true,
        src: ['**/*.css'],
        dest: 'dist/css/'            
      },
      views: {
        cwd: 'src/views',
        expand: true,
        flatten: true,
        nonull: true,
        src: ['**/*.html'],
        dest: 'dist/views/'            
      },
      json: {
        cwd: 'src/json',
        expand: true,
        flatten: true,
        nonull: true,
        src: ['**/*.json'],
        dest: 'dist/json/'
      },
      external_js: {
        cwd: 'src/externals',
        expand: true,
        flatten: true,
        nonull: true,
        src: ['**/*.js'],
        dest: 'dist/js/'
      }        
    },
    clean: {
      dist: ['dist']        
    }    
  });
  
  grunt.registerTask('build', ['clean', 'copy', 'concat']);
  grunt.registerTask('serve', ['build', 'connect:server', 'watch']);
  
};
