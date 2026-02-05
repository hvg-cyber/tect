/*
Zoom Level: 0 (100%)
Zoom Level: 1 (120%)
Zoom Level: 2 (144%)
Zoom Level: 3 (173%)
Zoom Level: 4 (207%)
Zoom Level: 5 (249%)
Zoom Level: 6 (299%)
Zoom Level: 7 (358%)
Zoom Level: 8 (430%)

(1) Выяснить как мы можем от числа 5 перейти к числу 249 или от числа 2 перейти к числу 144
(2) Реализовать функцию localize которая будет возвращать строку на основе шаблона "Zoom Level: {0} ({1}%)"
и заполнять его данными полученными на предыдущем шаге
*/
const levels = {
    0: 100,
    1: 120,
    2: 144,
    3: 173,
    4: 207,
    5: 249,
    6: 299,
    7: 358,
    8: 430
}

function getWindowById() {
    return {}
}
function getZoomFactor() {}
function getZoomLevel() {
    return 5
}
function localize(unused1, tamplate, zoom) {

}

function updateZoomLevelLabel(targetWindowId) {
    console.log(this)
    if (this.zoomLevelLabel) {
        const targetWindow = getWindowById(targetWindowId, true).window;
        const zoomFactor = Math.round(getZoomFactor(targetWindow) * 100);
        const zoomLevel = getZoomLevel(targetWindow);

        this.zoomLevelLabel.label = `${zoomLevel}`;
        this.zoomLevelLabel.tooltip = localize('zoomNumber', "Zoom Level: {0} ({1}%)", zoomLevel, zoomFactor);
    }
}

const thisObj = {
    zoomLevelLabel: {}
}
const updateZoomLevelLabelBound = updateZoomLevelLabel.bind(thisObj)
updateZoomLevelLabelBound(123)
console.log(thisObj.zoomLevelLabel.tooltip)
