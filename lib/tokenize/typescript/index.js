'use strict';

module.exports = {
    TSTypeParameterDeclaration(path, {print}) {
        print('<');
        path.get('params').forEach(print);
        print('>');
    },
    TSTypeParameterInstantiation(path, {print}) {
        print('<');
        path.get('params').forEach(print);
        print('>');
    },
    TSTypeReference(path, {print}) {
        print('__typeName');
    },
    TSTypeParameter(path, {write}) {
        write(path.node.name);
    },
    TSNumberKeyword(path, {write}) {
        write('number');
    },
    TSTypeAnnotation(path, {print}) {
        print(':');
        print.space();
        print('__typeAnnotation');
    },
    TSExpressionWithTypeArguments(path, {print}) {
        print('__expression');
        print('__typeParameters');
    },
};
