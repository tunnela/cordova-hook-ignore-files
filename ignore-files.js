#!/usr/bin/env node
import q from 'q';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import xml2js from 'xml2js';
import {deleteSync} from 'del';

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
        glob(ignoreFiles[i].$.ignore, {}, function (er, files) {
          for (var i = 0, l = files.length; i < l; ++i) {
            deleteSync(files[i]);

            console.log('ignore-files.js: File `' + files[i] + '` ignored.');
          }
        })
      }
      deferral.resolve();
    });
  });

  return deferral.promise;
};