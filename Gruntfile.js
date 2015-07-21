module.exports = function (grunt) {

	// Define the configuration for all the tasks
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'app/',
					src: ['config.js'],
					dest: 'dist/'
				}]
			}
		},
		concat: {
			options: {
			},
			dist: {
				src: ['app/firebase.js', 'app/ionicOAuth.js', '!app/config.js', 'app/plugin.js'],
				dest: 'dist/<%= pkg.name %>.js',
			},
		},
		uglify: {
			options: {
				banner: '// <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n' + '// http://www.dhouse.in\n'
			},
			build: {
				src: ['app/firebase.js', 'app/ionicOAuth.js', '!app/config.js', 'app/plugin.js'],
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		jshint: {
			all: ['app/*.js']
		},
		clean: {
			js: ['dist/*.min.js']
		},
		// Test settings
		karma: {
			unit: {
				configFile: 'test/karma.conf.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('test', ['clean', 'jshint', 'karma:unit']);
	grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify', 'copy', 'karma:unit']);
};