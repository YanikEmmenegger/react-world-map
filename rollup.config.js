// rollup.config.js
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const json = require('@rollup/plugin-json');
const pkg = require('./package.json');

module.exports = {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true
        },
        {
            file: pkg.module,
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        json(),
        typescript({ tsconfig: './tsconfig.json' }),
        postcss({
            extensions: ['.css'],
            extract: true,
            minimize: true,
            sourceMap: true
        })
    ]
};
