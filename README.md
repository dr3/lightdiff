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
First Meaningful Paint     2830    2585    -9.48%
First Contentful Paint     2619    2270    -15.37%
Speed Index                2619    2270    -15.37%
Estimated Input Latency    31      13      -138.46%
Time To First Byte         21      37      +43.24%
First Cpu Idle             5561    2851    -95.05%
Interactive                5561    3333    -66.85%
Mainthread Work Breakdown  3661    774     -373.00%
Bootup Time                1410    71      -1885.92%
Network Requests           88      20      -340.00%
Total Byte Weight          664232  109229  -508.11%
Unused Css Rules           150     0       -Infinity%
```

## Examples

```
lightdiff https://www.example.com/ https://test.example.com/

lightdiff https://www.example.com/ https://test.example.com/ -n 15

lightdiff https://www.example.com/ https://test.example.com/ -one 'Live Site' -two 'Test Site'

```

## License

MIT