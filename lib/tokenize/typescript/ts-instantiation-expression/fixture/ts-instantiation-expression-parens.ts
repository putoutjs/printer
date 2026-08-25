type C = {};

const a: {
    b: <T>(strings: TemplateStringsArray, ...values: unknown[]) => void;
} = {
    b: <T>(strings: TemplateStringsArray, ...values: unknown[]) => {},
};

((a?.b)<C>)`foo`;