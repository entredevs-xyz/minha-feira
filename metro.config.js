// Learn more https://docs.expo.io/guides/customizing-metro
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)
config.transformer = {
    ...config.transformer,
    minifierConfig: {
        keep_classnames: true, // FIX typeorm
        keep_fnames: true, // FIX typeorm
        mangle: {
            keep_classnames: true, // FIX typeorm
            keep_fnames: true, // FIX typeorm
        },
        output: {
            ascii_only: true,
            quote_style: 3,
            wrap_iife: true,
        },
        sourceMap: {
            includeSources: false,
        },
        toplevel: false,
        compress: {
            reduce_funcs: false,
        },
    },
}
module.exports = config
