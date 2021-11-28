
// 模版解析器
class Compile {
    constructor (vm, el) {
        this.vm = vm
        this.compileELe(el)
        return this
    }
    compileELe (el) {
        let childNodes = el.childNodes
        const self = this
        Array.from(childNodes).forEach(node => {
            const reg = /\{\{(.*)\}\}/
            const text = node.textContent
            // 存在 {{ }}
            if (reg.test(text)) {
                this.compileText(node, text.match(reg)[1])
            }
            // 继续遍历子节点
            if (node.childNodes && node.childNodes.length) {
                self.compileELe(node)
            }
        })
    }
    compileText (node, attr) {
        node.textContent = this.vm.data[attr]
        new Watcher(this.vm, attr, (val) => {
            node.textContent = val
        })
    }
}
