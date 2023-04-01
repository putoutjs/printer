import fs, {readFile} from 'fs/promises';
import 'supertape/bin/supertape';
import {compile, parse} from './index.js';

export function hello() {}