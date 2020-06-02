# mini-event-trigger
事件管理器，事件传递简单全面的处理方式。

全局事件监听器
1. key必须是字符串
2. 方法:
emit触发
on监听 (可同时多个cb) 
events.on('key', () => { alert(1) })
events.on('key', () => { alert(2) })
once监听 （只触发一次，然后自动销毁）
off取消监听 
includes, clearAll
3. 全局可用消息中心
