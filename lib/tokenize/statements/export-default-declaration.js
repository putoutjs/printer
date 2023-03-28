'use strict';

const {isFirst} = require('../is');
const {hasPrevNewline} = require('../mark');

module.exports.ExportDefaultDeclaration = (path, {print}) => {
    print('export default ');
    print('__declaration');
    print(';');
};
