declare module 'xterm' {
    export interface ITerminalOptions {
        /**
         * Whether to allow the use of proposed API. When false, any usage of APIs
         * marked as experimental/proposed will throw an error. The default is
         * false.
         */
        allowProposedApi?: boolean;

        /**
         * Whether background should support non-opaque color. It must be set before
         * executing the `Terminal.open()` method and can't be changed later without
         * executing it again. Note that enabling this can negatively impact
         * performance.
         */
        allowTransparency?: boolean;
    }
}