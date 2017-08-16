module.exports = function(config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            { pattern: "src/**/*.ts" },
            { pattern: "src/**/*.tsx" },
        ],
        preprocessors: {
            "**/*.ts": ["karma-typescript"],
            "**/*.tsx": ["karma-typescript"],
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["PhantomJS", "ChromeHeadless"],
        singleRun: true,
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.test.json",
            bundlerOptions: {
                transforms: [
                    require("karma-typescript-es6-transform")({presets: ["env"]})
                ]
            }
        }
    });
};