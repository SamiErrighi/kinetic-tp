module.exports = function(grunt) {

  // Configuration de Grunt
	grunt.initConfig({
		mochaTest: {
		    test: {
		        options: {
		        	reporter: 'spec',
		        	captureFile: 'results.txt', // Optionally capture the reporter output to a file
		        	quiet: false, // Optionally suppress output to standard out (defaults to false)
		        	clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
		        },
		     	src: ['tests/**/*.js']
		    }
		},
		copy: {
		 	main: {
		    	src: 'src/fonts',
		    	dest: 'build/fonts'
		  	},
		},
	    inline: {
	        dist: {
	            src: ['src/index.html'],
	            dest: ['build/']
	        }
	    },
		compass: {                  // Task
			dist: {                   // Target
				options: {              // Target options
					sassDir: 'src/sass',
					cssDir: 'build',
					environment: 'production'
				}
			}
		},
		watch: {
			css: {
				files: ['src/sass/*.scss'],
				tasks: ['compass']
			},
			js: {
				files: ['src/js/*.js'],
				tasks: ['concat']
			},
			bower: {
				files: ['bower.json'],
				tasks: ['bower']
			},
			index: {
				files: ['src/index.html'],
				tasks: ['inline']
			},
			image: {
				files: ['src/img/'],
				tasks: ['imagemin']
			},

			fonts: {
				files: ['src/fonts/'],
				tasks: ['copy']
			}
		},
		concat: {
			options: {
				separator: ';', // permet d'ajouter un point-virgule entre chaque fichier concaténé.
			},
			dist: {
				src: ['src/js/main.js'], // la source
				dest: 'build/main.js' // la destination finale
			}
		},
		uglify: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['src/js/main.js'],
				dest: 'build/main.js'
			}
		},

		imagemin: {
		    png: {
		    	options: {
		    		optimizationLevel: 7
		    	},
		    	files: [
		        {
		    		// Set to true to enable the following options…
		    		expand: true,
		    		// cwd is 'current working directory'
		    		cwd: 'src/img/',
		     		src: ['**/*.png'],
		    		// Could also match cwd line above. i.e. project-directory/img/
		    		dest: 'build/img/',
		    		ext: '.png'
		        }
		      ]
		    },
		    jpg: {
		    	options: {
		    		progressive: true
		    	},
		    	files: [
			        {
			        	// Set to true to enable the following options…
			        	expand: true,
			        	// cwd is 'current working directory'
			        	cwd: 'src/img/',
			        	src: ['**/*.jpg'],
			        	// Could also match cwd. i.e. project-directory/img/
			        	dest: 'build/img/',
			        	ext: '.jpg'
			        }
		     	]
		    }
		},
		bower: {
    		install: {
    			options: {
    				targetDir: 'build/bower_components',
    			}
    		}
  		}
	})

	// Import du package
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-inline');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.registerTask('dist', ['uglify:dist']);

	grunt.registerTask('default', 'mochaTest');
	grunt.registerTask('dev', ['concat:dist', 'compass:dist', 'imagemin', 'inline:dist', 'copy:main', 'bower:install'])
}