const a = 5;
const places = runPlugins({
    ast,
    shebang: false, // default
    fix: false, // default
    fixCount: 0, // default
    plugins,
    parser: 'babel', // default
});

fn(places);
