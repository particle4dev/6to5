var to5     = Npm.require('6to5');
// https://github.com/meteor/meteor/tree/devel/packages/coffeescript
// https://github.com/6to5/gulp-6to5/blob/master/index.js
var addSharedHeader = function (source, sourceMapJSON) {
    var header = [
        "var app = typeof window !== 'undefined' ? window : global;",
        "app.__es6Share = typeof app.__es6Share === 'object' ",
        "? app.__es6Share : {}; ",
        "var share = app.__es6Share;\n"
        ].join('');
    source = source.replace(/^(?:((['"])use strict\2;)\n)?/, function (match, useStrict) {
        if (match) {
            // There's a "use strict"; we keep this as the first statement and insert
            // our header at the end of the line that it's on. This doesn't change
            // line numbers or the part of the line that previous may have been
            // annotated, so we don't need to update the source map.
            return useStrict + "  " + header;
        } else {
            // There's no use strict, so we can just add the header at the very
            // beginning. This adds a line to the file, so we update the source map to
            // add a single un-annotated line to the beginning.
            sourceMapJSON.mappings = ";" + sourceMapJSON.mappings;
            return header;
        }
    });
    return {
        source: source,
        sourceMap: JSON.stringify(sourceMapJSON)
    };
};

var compile = function(compileStep) {
    var source = compileStep.read().toString('utf8');
    var outputFile = compileStep.inputPath + ".js";
    outputFile = outputFile.replace(/\.es6\.js$/, '.js');
    // https://github.com/6to5/6to5/issues/285
    var options = {
        filename: outputFile,
        sourceMap: true,
        // modules: "amd"
    };
    var res;
    try {
        res = to5.transform(source, options);
    }
    catch (e) {
        // XXX better error handling, once the Plugin interface support it
        throw new Error(
            compileStep.inputPath + ':' +
            (e.location ? (e.location.first_line + ': ') : ' ') +
            e.message
        );
    }

    var sourceWithMap = addSharedHeader(res.code, res.map);

    compileStep.addJavaScript({
        path: outputFile,
        sourcePath: compileStep.inputPath,
        data: sourceWithMap.source,
        sourceMap: sourceWithMap.sourceMap,
        // bare: compileStep.fileOptions.bare
        // # Normally, variables should be file-local, but this file is loaded with {bare:
        // # true}, so it should be readable by bare_tests.js
    });
}

Plugin.registerSourceHandler("es6.js", compile);