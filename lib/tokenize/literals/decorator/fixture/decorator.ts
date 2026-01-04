class Disposable {}
type ITerminal = string;
type IInstantiationService = string;
type ICoreBrowserService = string;
type IRenderService = string;

export class AccessibilityManager extends Disposable {
    constructor(
        private readonly_terminal: ITerminal,
        // @ts-expect-error
        @IInstantiationService instantiationService: IInstantiationService,
        // @ts-expect-error
        @ICoreBrowserService private readonly _coreBrowserService: ICoreBrowserService,
        // @ts-expect-error
        @IRenderService private readonly _renderService: IRenderService
    ) {
        super();
    }
}