# UI5Preload

Builds Component-preload.js for OPENUI5/SAPUI5 with Gulp. The preload combines only the files you want to (homepage, search, landingpage, etc.), so you can keep bigger applications lean on the initial load. Please configure the gulpfile accordingly (Views Directory, Preload Destination and Namespaces). The Gulp build adds crlf and utf8 to the Component-preload.js file so you don't have issues with Eclipse.


## Getting Started

Download gulpfile.js and package.json to the Project/WebContent/ directory. 
Navigate with CMD/Terminal to Webcontent directory, install dependencies with:

```
npm install
```

Start Gulp with:

```
gulp
```

Gulp will now combine all the files configured in gulpfile.js to Component-preload.js.

If you are working with Eclipse don't forget to add "Resource Filter" to the WebContent directory for [Exclude All, Files and folders, All Children] name matches: node_modules. Otherwise you will have 10k new files after npm installs all the dependencies.


## Further OPENUI5/SAPUI5 Performance improvements

You can combine OPENUI5/SAPUI5 thirdparty scripts and your own into a single javascript file and reduce the HTTP requests even further.

```
gulp.task('buildthirdpartyscripts', function() {
  gulp.src([
      './javascript/sap/ui/thirdparty/signals.js',
      './javascript/sap/ui/thirdparty/hasher.js',
      './javascript/sap/ui/thirdparty/crossroads.js',
      './javascript/sap/ui/thirdparty/datajs.js',
      './javascript/javascript.js',
    ])
    .pipe(tap(function(file) {
      file.contents = Buffer.concat([
        file.contents,
      ]);
    }))
    //.pipe(uglify()) npm install gulp-uglify
    .pipe(concat('thirdparty.js')) //filename
    .pipe(convertNewline({
        newline: "crlf",
        encoding: "utf8"
    }))
    .pipe(gulp.dest('./dist')) //destination folder
});
```

CMD/Terminal

```
gulp buildthirdpartyscripts
```


This will create a thirdparty.js file you can load (You must have the OPENUI5/SAPUI5 thirdparty javscript files on your disk to combine them!). Now declare on the initialization of SAPUI5 the thirdparty scripts and load thirdparty.js instead.

```
jQuery.sap.declare('sap.ui.thirdparty.signals');
jQuery.sap.declare('sap.ui.thirdparty.hasher');
jQuery.sap.declare('sap.ui.thirdparty.crossroads');
jQuery.sap.declare('sap.ui.thirdparty.datajs');
```
