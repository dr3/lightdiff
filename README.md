# lightdiff

[![NPM Version](http://img.shields.io/npm/v/lightdiff.svg?style=flat)](https://www.npmjs.org/package/lightdiff)

Comparing the performance impact of a change can be tedious. Lighthouse reports can be hard to compare and inconsitant. lightdiff aims to reduce this issue by offering easy peformance comparison on the average of multiple lighthouse reports.


## Installation

    $ npm install -g lightdiff

## Useage

```
Usage: lightdiff [options] <url1> <url2>

  Options:

    -V, --version          output the version number
    -n, --number <number>  The number of times both URLs should be run in lighthouse
    -o, --one <one>        The title of the first URL tested
    -t, --two <two>        The title of the second URL tested
    -h, --help             output usage information
```

## License

MIT