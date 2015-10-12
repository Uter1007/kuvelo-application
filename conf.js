/**
 * Created by Christoph on 12.10.2015.
 */
exports.config = {
    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['tests/*spec.js'],
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
    }
}