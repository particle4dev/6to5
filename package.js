Package.describe({
    summary: "Use JavaScript of the future in current major JavaScript engines.",
    version: "1.0.0",
    name: "particle4dev:babel",
    git: "https://github.com/particle4dev/babel.git"
});

// meteor test-packages ./
var both        = ['client', 'server'];
var client      = ['client'];
var server      = ['server'];
var cordova     = ['web.cordova'];

// Npm.depends({
//     'promise': '6.1.0'
// });

Package._transitional_registerBuildPlugin({
    name: "compilees6plugin",
    use: [
        'underscore'
    ],
    sources: [
        'plugin/compile.es6.plugin.js'
    ],
    npmDependencies: {'babel': '4.0.1'}
});

Package.on_use(function(api) {
    api.versionsFrom('1.0');
});

Package.on_test(function (api) {
    api.use(['test-helpers', 'tinytest', "particle4dev:babel"]);

    api.add_files([
        'tests/classes.es6.js'
    ],
    both
    //, {bare: true});
    );

    api.add_files([
        'tests/classes.test.js'
    ],
    both);
});
