var gulp = require('gulp');
var scp = require('gulp-scp2');

gulp.task('default', function () {
    gulp.src('dist/**')
        .pipe(scp({
            host: '10.7.18.51',
            port: '23245',
            username: 'pdt_test_xiaoyongyong',
            password: 'Yslg6wLpKfsc6',
            dest: '/data/customer/web'
        }))
        .on('error', function(err) {
            console.log(err);
        });
});
