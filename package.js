Package.describe({
    summary: "Use JavaScript of the future in current major JavaScript engines.",
    version: "1.0.0",
    name: "particle4dev:6to5",
    git: "https://github.com/particle4dev/6to5.git"
});

// meteor test-packages ./
var both        = ['client', 'server'];
var client      = ['client'];
var server      = ['server'];
var cordova     = ['web.cordova'];

Package._transitional_registerBuildPlugin({
    name: "compilees6plugin",
    use: [],
    sources: [
        'plugin/compile.es6.plugin.js'
    ],
    npmDependencies: {'6to5': '3.3.4'}
});

Package.on_use(function(api) {
    api.versionsFrom('1.0');
});

Package.on_test(function (api) {
    api.use(['test-helpers', 'tinytest', 'jquery', 'templating', 'blaze', 'ui', "particle4dev:6to5"]);

    api.add_files([
        
    ], both);
});
