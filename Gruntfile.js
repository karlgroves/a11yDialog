'use strict';

module.exports = function (grunt) {
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Show elapsed time at the end
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed MIT */\n',
        // Task configuration.
        clean: {
            files: ['dist']
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: 'src/a11yDialog.js',
                dest: 'dist/a11yDialog.min.js'
            }
        },
        qunit: {
            all: {
                options: {
                    urls: ['http://localhost:9000/test/a11yDialog.html']
                }
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: 'src/.jshintrc'
                },
                src: ['src/**/*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/**/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'qunit']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            }
        },


        connect: {
            test: {
                options: {
                    hostname: '*',
                    port: 9000
                }
            },
            demo: {
                options: {
                    protocol: 'http',
                    port: 9000,
                    hostname: '*',
                    base: 'demo',
                    directory: 'demo',
                    keepalive: true
                }
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['jshint', 'travis-lint', 'clean', 'uglify']);
    grunt.registerTask('server', ['connect:test', 'watch']);
    grunt.registerTask('test', ['connect:test', 'qunit']);
};
