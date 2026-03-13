import {callWhenTestsEnds} from 'supertape';
import {whenTestsEnds} from '#type-checker/when-tests-ends';

callWhenTestsEnds('TYPE_CHECK', whenTestsEnds);
