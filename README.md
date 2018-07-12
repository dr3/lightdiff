# lightdiff

[![NPM Version](http://img.shields.io/npm/v/lightdiff.svg?style=flat)](https://www.npmjs.org/package/lightdiff)

Comparing the performance impact of a change can be tedious. Lighthouse reports can be hard to compare and inconsitant. lightdiff aims to reduce this issue by offering easy peformance comparison on the average of multiple lighthouse reports.


## Installation

    $ npm install -g lightdiff

## Useage

```
Usage: lightdiff [options] <url1> <url2>

  Options:

    -V, --version                output the version number
    -n, --number <number>        The number of times both URL's should be run in lighthouse (default: 5)
    -o, --one <one>              The title of the first URL tested
    -t, --two <two>              The title of the second URL tested
    -i, --instances <instances>  The number lighthouse instances used at once (default: 5)
    -h, --help                   output usage information
```

## Examples

```
lightdiff https://www.example.com/ https://test.example.com/

lightdiff https://www.example.com/ https://test.example.com/ -n 15

lightdiff https://www.example.com/ https://test.example.com/ -one 'Live Site' -two 'Test Site'

```

## License

MIT