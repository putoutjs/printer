import mockRequire from 'mock-require';
import {createMockImport} from 'mock-import';

const {stopAll} = createMockImport(import.meta.url);
const a = 'hello';
const b = 'world';