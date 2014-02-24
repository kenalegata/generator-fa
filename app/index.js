'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var F5assembleGenerator = yeoman.generators.Base.extend({
  init: function () {

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the fantastic F5assemble generator.'));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.directory('foundation', 'app');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  gruntfile: function() {
    this.template('Gruntfile.js');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = F5assembleGenerator;