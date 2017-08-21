module.exports = function(config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            { pattern: "tests/**/*.ts" },
            { pattern: "tests/**/*.tsx" },
            { pattern: "src/**/*.ts" },
            { pattern: "src/**/*.tsx" },
        ],
        preprocessors: {
            "src/**/*.ts": ["karma-typescript", "coverage"],
            "src/**/*.tsx": ["karma-typescript", "coverage"],
            "tests/**/*.ts": ["karma-typescript"], 
            "tests/**/*.tsx": ["karma-typescript"],
        },
        reporters: ["progress", "karma-typescript", "coverage"],
        browsers: ["PhantomJS", "ChromeHeadless"],
        coverageReporter: {
            type : 'lcovonly',
            dir : 'coverage/',
        },
        singleRun: true,
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.test.json",
            bundlerOptions: {
                exclude: [
                    "react/addons",
                    "react-addons-test-utils",
                    'react/lib/ExecutionEnvironment',
                    'react/lib/ReactContext',
                ],
                transforms: [
                    require("karma-typescript-es6-transform")({presets: ["env"]})
                ]
            }
        }
    });
};