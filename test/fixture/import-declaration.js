import fs, {readFile} from 'fs/promises';
import 'supertape/bin/supertape';
import {compile, parse} from './create-test.js';

export function hello() {}