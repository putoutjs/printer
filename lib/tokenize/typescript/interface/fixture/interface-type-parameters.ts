type Mark = number;
type ExprRef = string;
type SignalRef = string;

interface A {}

interface B {}

interface MarkDef<
    M extends string | Mark = Mark,
    ES extends ExprRef | SignalRef = ExprRef | SignalRef,
>
extends A, B {}