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

  installingPostCssDependecy() {
    this.npmInstall(['gulp'], {
      'save-dev': true
    });
    this.npmInstall(['gulp-postcss'], {
      'save-dev': true
    });
    this.npmInstall(['postcss-cssnext'], {
      'save-dev': true
    });
    this.npmInstall(['gulp-cssnano'], {
      'save-dev': true
    });
    this.npmInstall(['gulp-sourcemaps'], {
      'save-dev': true
    });
    this.npmInstall(['lost'], {
      'save-dev': true
    });
    this.npmInstall(['gulp-cssbeautify'], {
      'save-dev': true
    });
    this.npmInstall(['gulp-rename'], {
      'save-dev': true
    });
    this.npmInstall(['gulp-htmlmin'], {
      'save-dev': true
    });
    this.npmInstall(['gulp-html-replace'], {
      'save-dev': true
    });
    this.npmInstall(['postcss-import'], {
      'save-dev': true
    });
    this.npmInstall(['browser-sync'], {
      'save-dev': true
    });
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

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name:',
      default: this.appname // Default to current folder name
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath(''),
      this.destinationPath('')
    );
    var pkg = {
      "name": this.props.name,
      "version": "0.0.0",
      "dependencies": {},
      "description": "Postcss project",
      "main": "gulpfile.js",
    };
    var write_stream = fs.createWriteStream('package.json');
    write_stream.write(JSON.stringify(pkg));
  },

  install: function () {
    this.installDependencies({
      bower: false
    });
  }
});
