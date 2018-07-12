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

## Example Output

```
Metric                     Url 1   Url 2   Difference
-------------------------  ------  ------  ----------
First Meaningful Paint     2681    2611    -2.61%
First Contentful Paint     2466    2313    -6.2%
Speed Index                2697    2313    -14.24%
Estimated Input Latency    68      13      -80.88%
Time To First Byte         32      70      +118.75%
First Cpu Idle             5805    2891    -50.2%
Interactive                5805    3367    -42%
Mainthread Work Breakdown  4705    904     -80.79%
Bootup Time                2137    138     -93.54%
Network Requests           88      20      -77.27%
Total Byte Weight          659573  109176  -83.45%
Unused Css Rules           250     57      -77.2%
```

## Examples

```
lightdiff https://www.example.com/ https://test.example.com/

lightdiff https://www.example.com/ https://test.example.com/ -n 15

lightdiff https://www.example.com/ https://test.example.com/ -one 'Live Site' -two 'Test Site'

```

## License

MIT