/*

Motivation: I need to understand how 'workbench.action.reloadWindow'



IHostService                                src\vs\workbench\services\host\browser\host.ts: 20
    BrowserHostService                      src\vs\workbench\services\host\browser\browserHostService.ts:65
    WorkbenchHostService                    src\vs\workbench\services\host\electron-browser\nativeHostService.ts:32

ICommonNativeHostService                    src\vs\platform\native\common\native.ts:63
    INativeHostService                      src\vs\platform\native\common\native.ts:243
        NativeHostService                   src\vs\platform\native\common\nativeHostService.ts
            WorkbenchNativeHostService      src\vs\workbench\services\host\electron-browser\nativeHostService.ts:22
    INativeHostMainService                  src\vs\platform\native\electron-main\nativeHostMainService.ts
        NativeHostMainService               src\vs\platform\native\electron-main\nativeHostMainService.ts


*/