const gulp = require("gulp");
const postcss = require("gulp-postcss");
const tailwindcss = require("tailwindcss");
const gutil = require('gulp-util')
const plumber = require('gulp-plumber')
const PATHS = {
    css: "./src/style/main.css",
    config: "./tailwind.js",
    dist: "css/"
};

gulp.task("css", () => {
    return gulp
        .src(PATHS.css)
        .pipe(plumber(function (error) {
			console.log(error);
			this.emit('end');
		}))
        .pipe(postcss(
            [
                tailwindcss(PATHS.config),
                require("autoprefixer")
            ]))
        .on('error', gutil.log)
        .pipe(gulp.dest(PATHS.dist));
});

gulp.task("default", ["css"]);

gulp.task("watch", () => {
    gulp.watch([PATHS.css, PATHS.config], ["css"]);
});