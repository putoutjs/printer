const boundaryElement = <HTMLElement>e.target;
const boundaryElement2 = e.target as HTMLElement;

const status = await (navigator as unknown as IFontAccessNavigator).permissions.request?.({
    name: 'local-fonts',
});