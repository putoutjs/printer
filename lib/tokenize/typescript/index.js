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
    TSAnyKeyword(path, {write}) {
        write('any');
    },
    TSVoidKeyword(path, {write}) {
        write('void');
    },
    TSFunctionType(path, {print}) {
        print('(');
        print(')');
        print.space();
        print('=>');
        print.space();
        print('__typeAnnotation');
    },
    TSTypeAnnotation(path, {print}) {
        if (!path.parentPath.isTSFunctionType()) {
            print(':');
            print.space();
        }
        
        print('__typeAnnotation');
    },
    TSExpressionWithTypeArguments(path, {print}) {
        print('__expression');
        print('__typeParameters');
    },
    TSTypeAliasDeclaration(path, {print}) {
        print('type ');
        print('__id');
        print.space();
        print('=');
        print.space();
        print('__typeAnnotation');
        print(';');
    },
};
