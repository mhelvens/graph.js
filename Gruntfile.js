"use strict";

module.exports = function (grunt) {

	//// loading grunt plugins

	[ 'grunt-contrib-uglify',
	  'grunt-contrib-watch',
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


		pkg: grunt.file.readJSON("package.json"),
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


		//////////////////////
		//// Minification ////
		//////////////////////


		uglify: {
			options: {
				mangle: false,
				banner: "<%= banner %>"
			},
			dist:    {
				files: {
					"<%= dirs.build %>/<%= pkg.name %>.min.js": "<%= dirs.js %>/<%= pkg.name %>.js"
				}
			}
		}


	});


	////////////////////////
	//// Register Tasks ////
	////////////////////////


	grunt.registerTask("default", [ "uglify" ]);

	// TODO: I myself run Karma through WebStorm; I have not yet succeeded in running it through Grunt

};
