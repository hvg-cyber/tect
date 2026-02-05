/*
    Starting point
*/

const tabs = [
    {title: 'file1.txt'},
    {title: 'file2.txt'},
    {title: 'file3.txt'},
]
for (const tab of tabs) {
    tab.elem = document.createElement('button')
    tab.elem.textContent = tab.title
    tab.elem.onclick = () => {
        activeTab.elem.style.backgroundColor = ''
        activeTab = tab
        activeTab.elem.style.backgroundColor = 'aqua'
        document.title = activeTab.title
    }
    document.body.append(tab.elem)
}
let activeTab = tabs[0]
activeTab.elem.style.backgroundColor = 'aqua'
document.title = activeTab.title
