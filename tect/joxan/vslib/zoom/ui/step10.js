
// src\vs\base\common\event.ts
class Emitter { // 995
    fire(event) {
        this._deliver(this._listeners, event)
    }
    _deliver(_listener, value) {
        _listener(value)
    }
    get event() {
        this._event = (callback) => {
            this._listeners = callback
        }
        return this._event
    }
}

// src\vs\workbench\browser\parts\statusbar\statusbarPart.ts
class StatusbarService {
    addEntry(entry) {
        document.body.append(entry.tooltip)
    }
}

// mock
class ActionBar {
    push() {

    }
}

// src\vs\base\common\actions.ts
class Action {
    constructor() {
	    this._onDidChange = new Emitter()
	    this.onDidChange = this._onDidChange.event
    }
	set label(value) {
		this._setLabel(value)
	}
	_setLabel(value) {
		if (this._label !== value) {
			this._label = value
			this._onDidChange.fire({ label: value })
		}
	}
}

// src\vs\workbench\electron-browser\window.ts
class NativeWindow { // 84
    constructor() {
        this.mapWindowIdToZoomStatusEntry = new Map() // 1088
    }
    createWindowZoomStatusEntry() { // 1116
        this.mapWindowIdToZoomStatusEntry.set(1, new ZoomStatusEntry())
        this.updateWindowZoomStatusEntry()
    }
    updateWindowZoomStatusEntry() { // 1127
        const entry = this.mapWindowIdToZoomStatusEntry.get(1)
        entry.updateZoomEntry()
    }
} // 1173
class ZoomStatusEntry { // 1175
    constructor() {
        this.statusbarService = statusbarService
    }
    updateZoomEntry() {
        this.createZoomEntry()
        this.updateZoomLevelLabel()
    }
    createZoomEntry() { // 1201
        const zoomOutAction = new Action('workbench.action.zoomOut')
        const zoomInAction = new Action('workbench.action.zoomIn')
        const zoomResetAction = new Action('workbench.action.zoomReset')
        const zoomSettingsAction = new Action('workbench.action.openSettings')
        this.zoomLevelLabel = new Action('zoomLabel')

		const container = document.createElement('div') // 1205
        container.classList.add('zoom-status')
        
		const left = document.createElement('div')
        left.classList.add('zoom-status-left')
		container.appendChild(left)

        const actionBarLeft = new ActionBar(left)
        actionBarLeft.push(zoomOutAction)
        actionBarLeft.push(this.zoomLevelLabel)
        actionBarLeft.push(zoomInAction)
        
		const right = document.createElement('div')
        right.classList.add('zoom-status-right')
		container.appendChild(right)

        const actionBarRight = new ActionBar(right)
        actionBarRight.push(zoomResetAction)
        actionBarRight.push(zoomSettingsAction)

        this.statusbarService.addEntry({
			tooltip: container,
		})
    }
    updateZoomLevelLabel() { // 1244
        const zoomLevel = 5
        this.zoomLevelLabel.label = `${zoomLevel}`
    }
} // 1254

// entry point
let statusbarService
function test() {
    statusbarService = new StatusbarService()
    const nativeWindow = new NativeWindow()
    nativeWindow.createWindowZoomStatusEntry()
}

test()
