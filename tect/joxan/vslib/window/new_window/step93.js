/*
    This program shows how a new window is opened

    TODO: Why is it in desktop an empty new window is opened, and
    in web a copy of an existing window is created?
*/

/****************************** common ******************************/

// mock
class Action2 {
}

// src\vs\workbench\browser\actions\windowActions.ts
class NewWindowAction extends Action2 {
	constructor() {
		super({
			id: 'workbench.action.newWindow',
		})
	}
	run() { // 437
		return hostService.openWindow()
	}
}
const newWindowAction = new NewWindowAction()

/****************************** web ******************************/

// index.html
class WorkspaceProvider {
    open() {
        const url = window.location.href
        window.open(url)
    }
}

// src\vs\workbench\services\environment\browser\environmentService.ts
class BrowserWorkbenchEnvironmentService { // 42
    constructor(options) { // 265
        this.options = options
    }
}
const options = {
    workspaceProvider: new WorkspaceProvider()
}
const environmentService = new BrowserWorkbenchEnvironmentService(options)

// src\vs\workbench\services\host\browser\browserHostService.ts
class BrowserHostService {
    constructor() {
        this.workspaceProvider = environmentService.options.workspaceProvider
    }
    openWindow(arg1) { // 232
        return this.doOpenEmptyWindow(arg1)
    }
    doOpenEmptyWindow() { // 470
        this.doOpen()
    }
    doOpen() { // 477
        this.workspaceProvider.open()
    }
}

/****************************** desktop ******************************/

// src\vs\base\parts\sandbox\electron-browser\preload.ts
;(() => {
    const {ipcRenderer, contextBridge} = electron
    const globals = { // 103
        ipcRenderer: {
            send() {
                ipcRenderer.send()
            }
        }
    }
    contextBridge.exposeInMainWorld('vscode', globals)
})();

// src\vs\base\parts\sandbox\electron-browser\globals.ts
const vscodeGlobal = globalThis.vscode
const ipcRenderer = vscodeGlobal.ipcRenderer

// src\vs\base\parts\ipc\common\ipc.ts
class ChannelClient { // 533
    constructor(protocol) {
        this.protocol = protocol
    }
    getChannel() {
        const that = this
        return {
            call() { // 556
                that.requestPromise()
            }
        }
    }
    requestPromise() { // 571
        this.sendRequest()
    }
    sendRequest() { // 694
        this.send()
    }
    send() { // 712
        this.sendBuffer()
    }
    sendBuffer() { // 719
        this.protocol.send()
    }
}
class IPCClient { // 983
    constructor(protocol) {
        this.channelClient = new ChannelClient(protocol)
    }
    getChannel() {
        return this.channelClient.getChannel()
    }
}
const ProxyChannel = { // 1093
    toService(channel) { // 1185
        return new Proxy({}, {
            get(_target, propKey) {
                return function() {
                    const result = channel.call(propKey)
                    return result
                }
            }
        })
    }
}

// src\vs\base\parts\ipc\common\ipc.electron.ts
// class Protocol
class ElectronProtocol { // 19
    constructor(sender) {
        this.sender = sender
    }
    send() {
        console.log('ElectronProtocol.send()')
        this.sender.send()
    }
}

// src\vs\base\parts\ipc\electron-browser\ipc.electron.ts
// class Client
class IPCElectronClient extends IPCClient {
    static createProtocol() {
        return new ElectronProtocol(ipcRenderer)
    }
    constructor() {
        const protocol = IPCElectronClient.createProtocol()
        super(protocol)
    }
}

// src\vs\platform\ipc\electron-browser\mainProcessService.ts
class ElectronIPCMainProcessService {
    constructor() {
        this.mainProcessConnection = new IPCElectronClient()
    }
    getChannel(channelName) {
        return this.mainProcessConnection.getChannel(channelName)
    }
}
const mainProcessService = new ElectronIPCMainProcessService()

// src\vs\platform\native\common\nativeHostService.ts
class NativeHostService {
    constructor(windowId) {
		return ProxyChannel.toService(mainProcessService.getChannel('nativeHost'), {
			context: windowId,
			properties: new Map([['windowId', windowId]]),
		})
    }

}

// src\vs\workbench\services\host\electron-browser\nativeHostService.ts
class WorkbenchNativeHostService extends NativeHostService {
}
const nativeHostService = new WorkbenchNativeHostService()
class WorkbenchHostService {
    constructor() {
    }
    openWindow(arg1) { // 103
        return this.doOpenEmptyWindow(arg1)
    }
    doOpenEmptyWindow() { // 140
        return nativeHostService.openWindow()
    }
}

/****************************** entry point ******************************/

// const hostService = new BrowserHostService()
const hostService = new WorkbenchHostService()

const openWindowButton = document.createElement('button')
openWindowButton.textContent = 'New Window'
openWindowButton.onclick = () => {
    newWindowAction.run()
}
document.body.append(openWindowButton)
