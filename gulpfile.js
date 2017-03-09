var gulp = require('gulp') ;
var fs   = require('fs') ;

fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
  require('./gulp/' + task);
});

gulp.task('default', ['styles', 'scripts', 'run:server']);