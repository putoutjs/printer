class DecoratorProvider {
    decorate(...args: any[]) {}
}

class D extends DecoratorProvider {
    m() {
        class C {
            @(super.decorate) // ✅ okay
            method2() {}
        }
    }
}