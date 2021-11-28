 // 订阅者容器
 function Dep () {
    this.subs = []
}
Dep.prototype.addSub = function (sub) {
    console.info(sub, '被添加进dep中')
    this.subs.push(sub)
}
Dep.prototype.notify = function () {
    console.info('dep.notify')
    this.subs.forEach(sub => {
        sub.update()
    })
}
 
 // 劫持数据，实现观察者
 function defineReactive (obj, key, val) {
    let dep = new Dep()
    Object.defineProperty(obj, key, {
        set (newVal) {
            console.log('set')
            val = newVal
            dep.notify()
        },
        get () {
            if (needAddDep) {
                dep.addSub(needAddDep)
            }
            return val
        },
        configurable: true,
        enumerable: true
    })
}
function observer (data) {
    // 遍历所有属性
    Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key])
    })
}