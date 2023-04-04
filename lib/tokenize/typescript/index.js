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
        if (path.parentPath.isIdentifier()) {
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
    TSTypeLiteral(path, {indent, traverse, write}) {
        write('{');
        write.newline();
        indent.inc();
        
        for (const member of path.get('members')) {
            indent();
            traverse(member);
            write(';');
        }
        
        write.newline();
        indent.dec();
        write('}');
    },
    TSPropertySignature(path, {print, maybe}) {
        const {optional} = path.node;
        print('__key');
        maybe.print(optional, '?');
        print(':');
        print.space();
        print('__typeAnnotation');
    },
};
