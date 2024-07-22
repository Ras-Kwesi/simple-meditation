module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: ['nativewind/babel']
    };
};


// module.exports = {
//     presets: [
//         '@babel/preset-expo',
//         ['@babel/preset-react', { runtime: 'automatic' }],
//     ],
// };

// module.exports =  {
//     presets: ['babel-preset-expo'],
//     plugins: ['nativewind/babel']

// };
