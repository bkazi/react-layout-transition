import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const isProd = process.env.PRODUCTION === 'true';

const targets = isProd ? [
{
    dest: path.resolve(__dirname, 'dist/react-layout-transition.min.js'),
    format: 'umd',
},
] : [
{
    dest: path.resolve(__dirname, 'dist/react-layout-transition.js'),
    format: 'umd',
},
{
    dest: path.resolve(__dirname, 'dist/react-layout-transition.es.js'),
    format: 'es',
},
];

const plugins = [
    resolve({
        jsnext: true,
        browser: true,
    }),
    replace({
        'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
    }),
    babel({
        babelrc: false,
        exclude: 'node_modules/**',
        presets: [
            ['env', {
                targets: {
                    browsers: ['last 3 versions', 'not ie < 11'],
                },
                modules: false,
                loose: true,
                useBuiltIns: true,
            }],
            'react',
        ],
        plugins: [
            'external-helpers',
            'transform-class-properties',
            'transform-object-rest-spread',
        ],
    }),
];

if (isProd) {
  plugins.push(
    uglify(),
  );
}

export default {
    entry: path.resolve(__dirname, 'src/index.js'),
    moduleName: 'react-transition-layout',
    exports: 'named',
    plugins,
    targets,
    external: ['react', 'react-dom'],
    globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
};
