// run this file using command `node --allow_natives_syntax v8-native-syntax.mjs`

import v8 from 'v8';

const exampleFunction = (...args) => Math.max(...args);

%DeoptimizeFunction(exampleFunction);
%NeverOptimizeFunction(exampleFunction);
%OptimizeFunctionOnNextCall(exampleFunction);
%PrepareFunctionForOptimization(exampleFunction);

v8.setFlagsFromString('--allow_natives_syntax'); // or any other flags
