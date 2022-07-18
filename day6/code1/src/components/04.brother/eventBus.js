// 导入mitt
import mitt from 'mitt'
// 创建 EventBus 实例对象
const bus = mitt()
// 然后将对象共享出去
export default bus
