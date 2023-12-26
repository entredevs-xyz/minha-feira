// Learn more https://docs.expo.io/guides/customizing-metro
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)
config.transformer = {
    ...config.transformer,
    minifierConfig: {
        ecma: 8,
        keep_classnames: true,
        keep_fnames: true,
        module: true,
        mangle: {
            module: true,
            keep_classnames: true,
            keep_fnames: true,
        },
    },
}
module.exports = config
