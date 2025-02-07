export class AccessibilityManager extends Disposable {
    constructor(
        private readonly_terminal: ITerminal,
        @IInstantiationService instantiationService: IInstantiationService,
        @ICoreBrowserService private readonly _coreBrowserService: ICoreBrowserService,
        @IRenderService private readonly _renderService: IRenderService
    ) {
        super();
    }
}