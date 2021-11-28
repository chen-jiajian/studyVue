// 订阅者watcher, 负责通知view
function Watcher (vm, key, updateCallback) {
    this.vm = vm
    this.key = key
    this.updateCallback = updateCallback
    this.value = this.get()
}
Watcher.prototype = {
    get () {
        needAddDep = this // 缓存自己，会被添加进dep中
        let val = this.vm.data[this.key] // 执行get
        needAddDep = null
        return val
    },
    update () {
        this.updateCallback(this.get())
    }
    
}    