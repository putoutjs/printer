export * as config from './package.json' with {
    type: 'json',
};

export {default as config} from './package.json' with {
    type: 'json',
};