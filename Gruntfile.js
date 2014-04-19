"use strict";

module.exports = function (grunt) {

	//// loading grunt plugins

	[ 'grunt-contrib-uglify',
	  'grunt-contrib-compress',
	  'grunt-contrib-watch',
	  'grunt-contrib-copy',
	  'grunt-karma'
	].map(grunt.loadNpmTasks);


	grunt.initConfig({


		////////////////////////////
		//// Define Directories ////
		////////////////////////////


		dirs: {
			js:    "src",
			build: "dist"
		},


		//////////////////
		//// Metadata ////
		//////////////////


		pkg:         grunt.file.readJSON("package.json"),
		banner: "\n" +
		        "/*\n" +
		        " * -------------------------------------------------------\n" +
		        " * Project: <%= pkg.title %>\n" +
		        " * Version: <%= pkg.version %>\n" +
		        " *\n" +
		        " * Author:  <%= pkg.author.name %>\n" +
		        " * Site:    <%= pkg.author.url %>\n" +
		        " * Contact: <%= pkg.author.email %>\n" +
		        " *\n" +
		        " *\n" +
		        " * Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.author.name %>\n" +
		        " * -------------------------------------------------------\n" +
		        " */\n" +
		        "\n",
		smallBanner: "/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today(\"yyyy-mm-dd\") %> */",


		////////////////////////////////////////
		//// Copying file to dist directory ////
		////////////////////////////////////////


		copy: {
			dist: {
				files: [
					{
						expand: true,
						flatten: true,
						src:  "<%= dirs.js %>/<%= pkg.name %>.js",
						dest: "<%= dirs.build %>"
					}
				]
			}
		},


		//////////////////////
		//// Minification ////
		//////////////////////


		uglify: {
			dist: {
				options: {
					banner:    "<%= smallBanner %>",
					sourceMap: true,
					report:    'gzip'
				},
				files:   {
					"<%= dirs.build %>/<%= pkg.name %>.min.js": "<%= dirs.js %>/<%= pkg.name %>.js"
				}
			}
		},


		/////////////////////
		//// Compression ////
		/////////////////////


		compress: {
			dist: {
				options: { mode: 'gzip' },
				src:     "<%= dirs.build %>/<%= pkg.name %>.min.js",
				dest:    "<%= dirs.build %>/<%= pkg.name %>.min.js.gz"
			}
		},


		/////////////////
		//// Testing ////
		/////////////////


		karma: {
			dev:  {
				options: {
					configFile: 'karma.dev-conf.js'
				}
			},
			dist: {
				options: {
					configFile: 'karma.dist-conf.js'
				}
			}
		}


	});


	////////////////////////
	//// Register Tasks ////
	////////////////////////


	grunt.registerTask("test:dev", [ "karma:dev" ]);

	grunt.registerTask("test:dist", [ "karma:dist" ]);

	grunt.registerTask("dist", [ "copy:dist", "uglify:dist", "compress:dist" ]);

};
