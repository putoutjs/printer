type Mark = number;

interface X {};
interface Y {};
declare class MarkDef<
    M extends string | Mark = number,
    ES extends X | X = Y | X,
>
implements X, Y {}