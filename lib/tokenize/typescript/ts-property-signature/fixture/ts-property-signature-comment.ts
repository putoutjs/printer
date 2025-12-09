interface B {}

interface C {}

interface A extends B, C {
    // <-- This
    property: string;
}