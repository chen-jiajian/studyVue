
// 模版解析器
class Compile {
    constructor (vm, el) {
        this.el = el
        this.vm = vm
        this.compileELe(el)
        return this
    }
    // 解析dom
    compileELe (el) {
        let childNodes = el.childNodes
        console.log('childNodes', childNodes)
        Array.from(childNodes).forEach(node => {
            const text = node.textContent
            // 判断{{}}的正则
            const reg = /\{\{(.*)\}\}/
            
            const attrs = node.attributes // 获取属性
            const attr = this.isDirective(attrs) // 指令属性
            console.log('attr', attr)
            if (attr) { // 指令优先
                if (attr.name === 'v-model') {
                    this.compileText(node, attr.value) 
                    this.bindEvent(node, attr.value)
                } else {
                    this.compileText(node, attr.value)
                }
            } else if (this.isTextNode(node, text) && reg.test(text)) { // 存在 {{ }}
                this.compileText(node, text.match(reg)[1])
            }
            // 继续遍历子节点
            if (node.childNodes && node.childNodes.length) {
                this.compileELe(node)
            }
        })
    }
    compileText (node, attr) {
        node.textContent = this.vm.data[attr] // 初始值
        new Watcher(this.vm, attr, (val) => {
            node.textContent = val // 更新通知view
        })
    }
    bindEvent (node, attr) {
        console.log('bindEvent', document.getElementById('nameInput'), node)
        node.addEventListener('input', (e) => {
            console.log('input事件', e.target.value)
            this.vm.data[attr] = e.target.value
        })
    }
    isTextNode (node, value) {
        return node.textContent = typeof value == 'undefined' ? '' : value;
    }
    // 是否指令
    isDirective (attrs) {
        if (!attrs || !attrs.length) return null
        const arr = Array.from(attrs).filter(attr => {
            return ['v-model', 'v-text'].includes(attr.name)
        })
        return arr[0]
    }
}























