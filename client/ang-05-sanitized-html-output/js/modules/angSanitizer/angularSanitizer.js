angular.module("angSanitizer", [])
.value("angSanitize", function sanitizeAngularTags(blob) {
    var regexes = [
            [/<!--(.*?)-->/gm, ""],           // remove comments
            [/ng-*(\w+)="(.*?)"/gm, ""],      // remove attributes with assignment
            [/ng-(\w*)(\s)?/gm, ""],          // remove classes and outstanding attributes
            [/\sclass=""/gm, ""],             // remove empty classes
            [/(\s)+/gm, " "],                 // remove continues spaces
            [/<(\w*)\s>/g, "<$1>"]            // remove spaces preceding closing tags
        ],
        sanitized = blob;

    regexes.forEach(function(regexArr) {
        sanitized = sanitized.replace(regexArr[0], regexArr[1]);
    });

    return sanitized;
});