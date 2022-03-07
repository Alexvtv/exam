const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
    const config = await createExpoWebpackConfigAsync({
        ...env,
        babel: {
            dangerouslyAddModulePathsToTranspile: ['@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView']
        }
    }, argv);
    return config;
};
