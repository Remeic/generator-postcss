'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
const mkdirp = require('mkdirp');
const path = require('path');
var fs = require('fs');

module.exports = Generator.extend({

  default () {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  },

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the impressive ' + chalk.red('Postcss Template') + ' generator!'
    ));
    //Introducing to generator
    this.log("Welcome to the postcss generator for simple project \nthe generator provide" + chalk.red(" 3 ") + "folder under" + chalk.bgWhite("production") +
      "\n\t" + chalk.bgBlue("/static folder (for html)") +
      "\n\t" + chalk.bgBlue("/css folder") +
      "\n\t" + chalk.bgBlue("/js folder"));

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name:',
        default: this.appname // Default to current folder name
      },
      {
        type: 'list',
        choices: [
          {
            name: "Gulp",
            value: "gulp"
          },
          {
            name: "Webpack",
            value: "webpack"
          }
        ],
        name: 'taskRunner',
        message: 'Which task runner would you like to use',
        default: "gulp"
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('./production'),
      this.destinationPath('./production')
    );
    var pkg = {
      "name": this.props.name,
      "version": "0.0.0",
      "scripts": {
      },
      "dependencies": {},
      "devDependencies": {
      },
      "description": "Postcss project",
      "main": "gulpfile.js",
    };

    if (this.props.taskRunner === "gulp") {
      this.fs.copy(
        this.templatePath('./gulpfile.js'),
        this.destinationPath('./gulpfile.js')
      );
      pkg.scripts = {
        "build": "gulp",
        "start": "gulp serve"
      };
      pkg.devDependencies = {
        "browser-sync": "2.18.13",
        "gulp": "3.9.1",
        "gulp-cssbeautify": "0.1.3",
        "gulp-cssnano": "2.1.2",
        "gulp-html-replace": "1.6.2",
        "gulp-htmlmin": "3.0.0",
        "gulp-postcss": "7.0.0",
        "gulp-rename": "1.2.2",
        "gulp-sourcemaps": "2.6.1",
        "lost": "8.2.0",
        "postcss-cssnext": "3.0.2",
        "postcss-import": "11.0.0"
      };
    } else if (this.props.taskRunner === "webpack") {
      this.fs.copy(
        this.templatePath('./webpack.config.js'),
        this.destinationPath('./webpack.config.js')
      );
      pkg.scripts = {
        "build": "webpack",
        "start": "webpack-dev-server"
      };
      pkg.devDependencies = {
        "css-loader": "0.28.4",
        "extract-text-webpack-plugin": "2.1.2",
        "file-loader": "0.11.2",
        "postcss-loader": "1.3.3",
        "style-loader": "0.13.0",
        "url-loader": "0.5.7",
        "webpack": "2.2.0",
        "webpack-dev-server": "1.14.1"
      };
    }

    var write_stream = fs.createWriteStream('package.json');
    write_stream.write(JSON.stringify(pkg, null, 2));
  },

  install: function () {
    this.installDependencies({
      bower: false
    });
  }
});
