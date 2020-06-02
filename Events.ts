/**
 * 全局事件监听器
 * 
 * 1. key必须是字符串
 * 2. 方法:
 * emit触发
 * 
 * on监听 (可同时多个cb) 
 * events.on('key', () => { alert(1) })
 * events.on('key', () => { alert(2) })
 * 
 * once监听 （只触发一次，然后自动销毁）
 * 
 * off取消监听
 *  
 * includes, clearAll
 * 
 * 3. 全局可用消息中心
 */

export interface Event {
    key: string,
    handlers: Function[],
    once: boolean
}

class Events {
    private list: Event[] = []
    constructor(){}

    public emit(key: string, ...args) {
        const event = this.list.find(t => t.key === key )
        if (event && Array.isArray(event.handlers)) {
            const { once, handlers } = event
            handlers.forEach(fn => fn && fn(...args))
            if (once) this.off(key)
        }
    }

    private register(key: string, handler: Function, isOnce?: boolean) {
        const target = this.list.findIndex(t => t.key === key)
        if (target >= 0) {
            const { once, handlers } = this.list[target]
            this.list.splice(target, 1, {
                key,
                handlers: handlers.concat(handler),
                once,
            })
        } else {
            this.list.push({ key, handlers: [handler], once: Boolean(isOnce) })
        }
    }

    public on(key: string, handler: Function) {
        this.register(key, handler, false)
    }

    public once(key: string, handler: Function) {
        this.register(key, handler, true)
    }

    public off(key: string) {
        this.list = this.list.filter(t => t.key !== key )
    }

    public includes(key: string) {
        return !!this.list.find(t => t.key === key)
    }

    public clearAll() {
        this.list = []
    }

}

const GlobalEvent = new Events()

export {
    Events,
    GlobalEvent
}
