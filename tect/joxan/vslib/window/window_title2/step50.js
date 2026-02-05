
// mock
class RunOnceScheduler {
    constructor(callback) {
        this.callback = callback
    }
    schedule() {
        this.callback()
    }
}

// src\vs\base\common\event.ts
class Emitter {
    constructor(options) {
        this._options = options
    }
    get event() { // 1076
        this._event ??= (callback, thisArgs) => {
            if (thisArgs) {
				callback = callback.bind(thisArgs)
			}
            this._listener = callback
            this._options?.onWillAddFirstListener(this) // 1114
        }
        return this._event
    }
    fire(event) { // 1221
        this._listener(event)
    }
}

// mock
class EditorService {
    constructor() {
        this._onDidActiveEditorChange = new Emitter()
        this.onDidActiveEditorChange = this._onDidActiveEditorChange.event
    }
}

// src\vs\workbench\browser\parts\titlebar\windowTitle.ts
class WindowTitle { // 53
    constructor() {
        this.editorService = new EditorService()
        this.titleUpdater = new RunOnceScheduler(() => this.doUpdateTitle(), 0)
        this.registerListeners()
    }
    registerListeners() { // 110
        this.editorService.onDidActiveEditorChange(() => this.onActiveEditorChange())
    }
    onActiveEditorChange() { // 150
        this.titleUpdater.schedule()
        // const activeEditor = this.editorService.activeEditor
        // activeEditor.onDidChangeLabel(() => this.titleUpdater.schedule())
    }
    doUpdateTitle() { // 187
        window.document.title = this.getFullWindowTitle()
    }
    getFullWindowTitle() { // 216
		const { prefix, suffix } = this.getTitleDecorations()
		let title = this.getWindowTitle()
		if (prefix) {
			title = `${prefix} ${title}`
		}
		if (suffix) {
			title = `${title} ${suffix}`
		}
		return title
    }
    getTitleDecorations() { // 232
        return {}
    }
    getWindowTitle() { // 303
        return '● abcfef • Untitled-2 - Workspace - Visual Studio Code'
    }
} // 414

// entry point
function test() {
    const windowTitle = new WindowTitle()
    windowTitle.doUpdateTitle()
}

test()
