export default async function cliParse(argv, scripts) {
    if (unknownName) {
        result = build('unknown', unknown, unknownName);
    } else if (args.version) {
        result = build('version', version);
    } else if (args.help || !args._.concat(args.parallel, args.series, args.parallelCalm, args.seriesCalm).length) {
        result = build('help', help);
    } else {
        const cmd = await parse(args, params, scripts);
        
        if (!cmd)
            result = build('script-not-found', scriptNotFound, args);
        else
            result = {
                name: 'run',
                quiet: args.quiet,
                calm: args.calm,
                cmd,
            };
    }
    
    log(`result: ${result.cmd || result.output}`);
    
    return result;
}

const parseArgs = (args) => yargsParser(args, {});