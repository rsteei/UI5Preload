var gulp = require('gulp');
var concat = require('gulp-concat-util');
var change = require('gulp-change')
var tap = require('gulp-tap');
var path = require('path');
var convertNewline = require("gulp-convert-newline");

var namesspaces = {
  'fragments': 'Fragments',
  'views': 'Views',
}

function modifyContent(content) {
  return JSON.stringify(content,null,'\t');
}

gulp.task('componentpreload', function() {
  gulp.src([
      './Views/Desktop/App.controller.js',
      './Views/Desktop/App.view.js',
      './Views/Desktop/Index.controller.js',
      './Views/Desktop/Index.view.xml',
      './Views/Desktop/Footer.view.js',
      './Views/Desktop/Footer.controller.js',
      './Views/Desktop/Header.controller.js',
      './Views/Desktop/Header.view.js',
      './Fragments/Index.fragment.js',
    ])
    .pipe(change(modifyContent))
    .pipe(tap(function(file) {
      file.contents = Buffer.concat([ new Buffer('"'+ ( file.path.indexOf(namesspaces.fragments) > -1 ? namesspaces.fragments :  namesspaces.views ) + '/' + path.basename(file.path) +'": '), file.contents, new Buffer(',') ]);
    }))
    .pipe(concat('Component-preload.js'))
    .pipe(concat.header('jQuery.sap.registerPreloadedModules({\n"name": "Views.Componentpreload",\n"version": "2.0",\n"modules": {\n'))
    .pipe(concat.footer('}});'))
    .pipe(convertNewline({
        newline: "crlf",
        encoding: "utf8"
    }))
    .pipe(gulp.dest('./Views/Desktop/'))
});


gulp.task('default', ['componentpreload']);