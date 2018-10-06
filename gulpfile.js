const gulp = require('gulp');
const minify = require('gulp-minify');
const sass = require('gulp-sass');
const del = require('del');
const imagemin = require('gulp-imagemin');
const replace = require('gulp-replace');
const argv = require('yargs').argv;
const cleanCSS = require('gulp-clean-css');
const sitemap = require('gulp-sitemap');


let paths = {
    src: 'src/**/*',
    srcHTML: '*.html',
    srcCSS: 'assets/css/**/*.css',
    srcSCSS: 'assets/sass/**/*.scss',
    srcJS: 'assets/js/**/*.js',
    srcFont: 'assets/css/font/**/*.*',
    srcFonts: 'assets/fonts/*.*',
    srcImages: 'assets/images/**/*.*',
    srcVendor: 'node_modules',
    dist: 'dist',
    distIndex: 'dist/index.html',
    distHtml: 'dist/*.html',
    distCSS: 'dist/assets/css',
    distFont: 'dist/assets/css/font',
    distFonts: 'dist/assets/fonts',
    distJS: 'dist/assets/js',
    distImages: 'dist/assets/images'
};

gulp.task('clean:dist', () => {
    return del([
        'dist'
    ]);
});

gulp.task('compress', () => {
    return gulp.src(paths.srcJS)
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest(paths.distJS))
});

gulp.task('sass', () => {
    return gulp.src(paths.srcSCSS)
        .pipe(sass().on('error', sass.logError))
         .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.distCSS));
});

gulp.task('generate:sitemap', function () {
    return gulp.src(paths.distHtml, {
        read: true
    })
        .pipe(sitemap({
            siteUrl: argv.URL
        }))
        .pipe(gulp.dest(paths.distHtml));
});


gulp.task('copy:fonts', () => {
    return gulp.src(paths.srcFonts).pipe(gulp.dest(paths.distFonts));
});

gulp.task('copy:font', () => {
    return gulp.src(paths.srcFont).pipe(gulp.dest(paths.distFont));
});

gulp.task('copy:images', () =>
    gulp.src(paths.srcImages)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.distImages))
);

// gulp.task('copy:images', () => {
//     return gulp.src(paths.srcImages).pipe(gulp.dest(paths.distImages));
// });

gulp.task('copy:fontawesome', () => {
    return gulp.src('node_modules/font-awesome/css/font-awesome.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.distCSS));
});

gulp.task('copy:html', () => {
    return gulp.src('*.html').pipe(gulp.dest(paths.dist));
});

gulp.task('copy:xml', () => {
    return gulp.src('*.xml').pipe(gulp.dest(paths.dist));
});

gulp.task('patch', () => {
    return gulp.src([paths.distJS + '/main.js'])
        .pipe(replace('SERVICE_ID', argv.SERVICE_ID))
        .pipe(replace('TEMPLATE_ID', argv.TEMPLATE_ID))
        .pipe(replace('USER_ID', argv.USER_ID))
        .pipe(gulp.dest(paths.distJS));
});


gulp.task('build', gulp.series('clean:dist', 'sass', 'compress', 'generate:sitemap', 'copy:font', 'copy:fonts', 'copy:images', 'copy:html', 'copy:xml', 'patch'));