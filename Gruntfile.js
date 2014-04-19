"use strict";

module.exports = function (grunt) {

	//// loading grunt plugins

	[ 'grunt-contrib-uglify',
	  'grunt-contrib-compress',
	  'grunt-contrib-watch'
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
		}


		/////////////////
		//// Testing ////
		/////////////////

		// TODO: I myself run karma/jasmine through WebStorm; I have not yet succeeded in running it through Grunt


	});


	////////////////////////
	//// Register Tasks ////
	////////////////////////


	grunt.registerTask("dist", [ "uglify:dist", "compress:dist" ]);

};
