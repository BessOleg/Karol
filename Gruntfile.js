module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            options:{
                separator: ';',
            },
            dist: {
                src: ['public/js/*.js'],
                dest: 'public/dist/built.js',
            },
        },
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
};