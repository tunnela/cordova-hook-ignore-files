# cordova-hook-ignore-files
Apache Cordova hook script for ignoring files from build.

## Usage

Install cordova-hook-ignore-files:

```shell
$ npm i --save-dev cordova-hook-ignore-files
```

```xml
<!-- config.xml -->
<hook type="after_prepare" src="./node_modules/cordova-hook-ignore-files/ignore-files.js" />
```

Ignore files ie. assets in `config.xml` with following syntax:

```xml
<!-- config.xml -->
<ignore-files ignore="platforms/**/www/**/*.scss" />
```

When running `cordova build`, Apache Cordova will invoke the hook after it has prepared your code for compilation and ignore listed files from build.

## Author

Lauri Tunnela is a young and passionate B.Eng. from Finland. He does everything from embedded C development to front-end web development. Lauri loves to build tools that make software development fast and easy for everyone. He hopes you to use cordova-hook-ignore-files as you see fit. Although, as its developer he would be more than happy to know where you've used it and what are your thoughts about it! For contact details see [Lauri's profile](https://github.com/tunnela).

## License

cordova-hook-ignore-files is licensed under The MIT License (MIT). 

Copyright (c) 2016 Lauri Tunnela