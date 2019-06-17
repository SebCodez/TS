// Set up jasmine
import './ts/JasmineSetup.ts';

// Import test files
import './test/model/Triangle.test.ts';
import './test/service/FormService.test.ts';

// Run tests
if (window['jasmineRef']) {
  location.reload();
} else {
  window.onload(undefined);
  window['jasmineRef'] = jasmine.getEnv();
}