# cordova-hook-ignore-files
Apache Cordova hook script for ignoring files from build.

# Usage

Install cordova-hook-ignore-files:

```shell
$ npm i --save-dev cordova-hook-ignore-files
```

```xml
<!-- config.xml -->
<hook type="after_prepare" src="./node_modules/cordova-hook-ignore-files/ignore-files.js" type="after_build" />
```

Ignore files ie. assets in `config.xml` with following syntax:

```xml
<!-- config.xml -->
<ignore-files ignore="platforms/**/www/**/*.scss" />
```

When running `cordova build`, Apache Cordova will invoke the hook after it has prepared your code for compilation and ignore listed files from build.