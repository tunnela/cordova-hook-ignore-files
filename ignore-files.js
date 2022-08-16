#!/usr/bin/env node
var q = require('q');
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var xml2js = require('xml2js');
var del = require('del');

module.exports = function(context) {
  var deferral = q.defer();
  var parser = new xml2js.Parser();

  fs.readFile('config.xml', 'utf8', function (err, xml) {
    if (err) {
      deferral.reject('Unable to load config.xml');

      return;
    }
    parser.parseString(xml, function (err, config) {
      if (err) {
        deferral.reject('Unable to parse config.xml');

        return;
      }
      if (config.widget === undefined || config.widget['ignore-files'] === undefined) {
        return;
      }
      var ignoreFiles = config.widget['ignore-files'];

      for (var i = 0, l = ignoreFiles.length; i < l; ++i) {
        if (ignoreFiles[i].$ === undefined || ignoreFiles[i].$.ignore === undefined) {
          continue;
        }
        var files = glob.sync(ignoreFiles[i].$.ignore, {});

        if (!files.length) {
          console.log('ignore-files.js: Nothing to ignore with pattern `' + ignoreFiles[i].$.ignore + '`.');

          continue;
        }
        console.log('ignore-files.js: Ignoring with pattern `' + ignoreFiles[i].$.ignore + '`.');

        for (var j = 0, k = files.length; j < k; ++j) {
          del.sync(files[j]);

          console.log('ignore-files.js: File `' + files[j] + '` ignored.');
        }
      }
      deferral.resolve();
    });
  });

  return deferral.promise;
};
