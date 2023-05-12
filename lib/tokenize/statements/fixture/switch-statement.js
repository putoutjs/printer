function reverse(a) {
....switch(a) {
....case '!==':
........console.log('hello');
........return '===';
....
....default:
........return `!${a}`.replace('=', '');
....}
}