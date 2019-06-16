declare const require: any;
import 'jasmine-core/lib/jasmine-core/jasmine.css';
window['jasmineRequire'] = require('jasmine-core/lib/jasmine-core/jasmine.js');
import 'jasmine-core/lib/jasmine-core/jasmine-html.js';
import 'jasmine-core/lib/jasmine-core/boot.js';

if (window['jasmineRef']) {
  location.reload();
} else {
  window.onload(undefined);
  window['jasmineRef'] = jasmine.getEnv();
}