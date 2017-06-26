module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: { //target
                src: ['./public/angular-front/app/**/*.js', '!./public/angular-front/app/min/app.min.js','!./public/angular-front/app/concat/app.concat.js'],
                dest: './public/angular-front/app/concat/app.concat.js'
            }
        },
        jshint : {
            beforeconcat: ['./public/angular-front/app/**/*.js', '!./public/angular-front/app/min/app.min.js','!./public/angular-front/app/concat/app.concat.js'],
            afterconcat: ['./public/angular-front/app/min/app.js']
        },
        uglify: {
            js: { //target
                src: ['./public/angular-front/app/concat/app.concat.js'],
                dest: './public/angular-front/app/min/app.min.js'
            }
        },
        watch: {
            scripts: {
                files: ['./public/angular-front/app/**/*.js','./public/angular-front/app/**/**/*.js', '!./public/angular-front/app/min/app.js'],
                tasks: ['jshint:beforeconcat','concat','uglify'],
                options: {
                    spawn: false
                }
            }
        }
    });
// Load the plugins that provide the tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default tasks
    grunt.registerTask('default', ['watch']);
    

};