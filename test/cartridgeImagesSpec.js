var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs-extra');
var chai = require('chai');
var expect = chai.expect;

chai.use(require('chai-fs'));
chai.should();

var ROOT_DIR = process.cwd();
var MOCK_PROJECT_DIR = path.join(process.cwd(), 'test', 'mock-project');
var IMAGES_SRC_DIR = path.join(MOCK_PROJECT_DIR, '_source', 'images');
var IMAGES_DEST_DIR = path.join(MOCK_PROJECT_DIR, 'public', '_client', 'images');

var SVG_DEST_DIR = path.join(IMAGES_DEST_DIR, 'svgs');
var MINIFY_DEST_DIR = path.join(IMAGES_DEST_DIR, 'minify');
var RESPONSIVE_DEST_DIR = path.join(IMAGES_DEST_DIR, 'responsive');

process.chdir(MOCK_PROJECT_DIR);

function cleanUp() {
	fs.removeSync(IMAGES_DEST_DIR);
}

function runGulpTask(options, callback) {

    var gulp = spawn('gulp', options)

    gulp.stdout.on('data', function(data) {
    	console.log(new Buffer(data).toString('utf8'));
    })

    gulp.on('close', function() {
        callback();
    });

}

describe('As a user of the cartridge-images module', function() {

	this.timeout(10000);

	describe('when `gulp images` is run WITHOUT production flag', function() {

		before(function(done) {
			runGulpTask(['images'], done)
		})

		after(function() {
			cleanUp();
		})

		it('should place images in the public images folder', function() {
			expect(IMAGES_DEST_DIR).to.be.a.directory().and.not.empty;
		})

		it('should place minified svgs in the public images folder', function() {
			expect(SVG_DEST_DIR).to.be.a.directory().and.not.empty;
		})

		it('should place generated responsive images in the public images folder', function() {
			expect(RESPONSIVE_DEST_DIR).to.be.a.directory().and.not.empty;
		})

	})

	describe('when `gulp images` is run WITH production flag', function() {

		before(function(done) {
			runGulpTask(['images', '--prod'], done)
		})

		after(function() {
			cleanUp();
		})

		it('should place images in the public images folder', function() {
			expect(IMAGES_DEST_DIR).to.be.a.directory().and.not.empty;
		})

		it('should place minified svgs in the public images folder', function() {
			expect(SVG_DEST_DIR).to.be.a.directory().and.not.empty;
		})

		it('should place generated responsive images in the public images folder', function() {
			expect(RESPONSIVE_DEST_DIR).to.be.a.directory().and.not.empty;
		})

	})

})