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
    TSTypeParameter(path, {print}) {
        print(path.node.name);
    },
    TSExpressionWithTypeArguments(path, {print}) {
        print('__expression');
        print('__typeParameters');
    },
};
