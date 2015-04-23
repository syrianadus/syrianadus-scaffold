'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the exquisite ' + chalk.red('Syrianadus Scaffold') + ' generator!'
    ));

    var prompts = [{
      name: 'navTitle',
      message: 'What is the title that you want to display on the Navbar?'
    }];

    this.prompt(prompts, function (props) {
      this.navTitle = props.navTitle;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      var context = {
        navTitle : this.navTitle
      };

      this.copy('syrianadus/app.js', 'app.js');
      this.copy('syrianadus/README.md', 'README.md');
      this.directory('syrianadus/assets', 'assets');
      this.directory('syrianadus/views', 'views');
      this.template('/syrianadus/views/layout.jade', 'views/layout.jade', context);
      this.directory('bpm-ui', 'bpm-ui');
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
