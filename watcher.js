// 订阅者watcher, 负责通知view
function Watcher (vm, key, updateCallback) {
    this.vm = vm
    this.key = key
    this.updateCallback = updateCallback
    this.addSelfToDep() // 添加自己到dep中
}
Watcher.prototype = {
    addSelfToDep () {
        hasWatcher = this
        let val = this.vm.data[this.key] // 触发get，添加进dep中
        hasWatcher = null
    },
    update () {
        this.updateCallback(this.vm.data[this.key])
    }
    
}    