const gulp = require("gulp");
const gulpLoadPlugins = require("gulp-load-plugins");

const { version } = require("./package.json");
const $ = gulpLoadPlugins();

gulp.task("manifest", () => {
  return gulp
    .src("src/manifest.json")
    .pipe($.jsonEditor({ version: version }))
    .pipe(gulp.dest("build"));
});

gulp.task("default", gulp.task("manifest"));

gulp.task("watch", function() {
  gulp.watch(["src/**/*.js"], gulp.task("webpack"));
  gulp.watch("src/manifest.json", gulp.task("manifest"));
});
