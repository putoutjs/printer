import {test} from 'supertape';
import {montag} from 'montag';
import {parse} from 'putout';
import {print} from '#printer';

test('printer: SQL', (t) => {
    const source = montag`
        __putout_processor_sql([
            insert(
                into(
                    users,
                    name,
                    values(
                        'Alice',
                    ),
                ),
            ),
            select(
                lastInsertRowid(),
            ),
        ]);\n
    `;
    
    const ast = parse(source);
    const options = {};
    const code = print(ast, options);
    
    t.equal(code, source);
    t.end();
});
