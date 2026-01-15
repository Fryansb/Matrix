const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

/**
 * Task: Compile SCSS to CSS
 * - Compila arquivos SCSS
 * - Minifica o output
 * - Gera arquivos na pasta dist/css
 */
function styles() {
  return gulp
    .src('./src/styles/main.scss')
    .pipe(sass({ 
      outputStyle: 'compressed',
      includePaths: ['./src/styles']
    }))
    .on('error', function(err) {
      console.error('Erro na compilação SCSS:', err.message);
      this.emit('end');
    })
    .pipe(gulp.dest('./dist/css'));
}

/**
 * Task: Optimize Images
 * - Comprime imagens
 * - Reduz tamanho dos arquivos
 * - Mantém qualidade visual
 */
function images() {
  return gulp
    .src('./src/images/**/*')
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 80, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { cleanupIDs: false }
        ]
      })
    ]))
    .on('error', function(err) {
      console.error('Erro na otimização de imagens:', err.message);
      this.emit('end');
    })
    .pipe(gulp.dest('./dist/images'));
}

/**
 * Task: Minify JavaScript
 * - Minifica arquivos JavaScript
 * - Reduz tamanho do código
 */
function scripts() {
  return gulp
    .src('./src/scripts/**/*.js')
    .pipe(uglify())
    .on('error', function(err) {
      console.error('Erro na minificação JS:', err.message);
      this.emit('end');
    })
    .pipe(gulp.dest('./dist/js'));
}

/**
 * Task: Watch for changes
 * - Monitora mudanças nos arquivos
 * - Recompila automaticamente
 */
function watchFiles() {
  gulp.watch('./src/styles/**/*.scss', styles);
  gulp.watch('./src/scripts/**/*.js', scripts);
  gulp.watch('./src/images/**/*', images);
}

// Export tasks
exports.styles = styles;
exports.images = images;
exports.scripts = scripts;
exports.watch = gulp.series(
  gulp.parallel(styles, scripts, images),
  watchFiles
);
exports.default = gulp.parallel(styles, images, scripts);
