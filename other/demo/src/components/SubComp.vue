<template>
  <div>
    <p>这是subcomp</p>
    <slot>a slot</slot>
    </div>
</template>

<script>
export default {
  name: 'SubComp',
  data () {
    return {
      msg: 'this is a data'
    }
  },
  props: {
    one: {
      type: String
    },
    two: {
      type: String
    }
  },
  // props 是传过来的属性
  // context 是上下文
  /*
  setup (props, context) {
    console.log('setup()---')
    console.log(this) // undefined
    console.log(props.one, props.two) // 1 2
    console.log(context.attrs.desc) // 没有用props接收到的属性可以在context.attrs中拿到
    console.log(context.slots.default())
    context.emit('myprint', '向父组件传数据')
  },
  */
  // 解构赋值的写法
  setup (props, { attrs, slots, emit }) {
    console.log('setup()---')
    console.log(this) // undefined
    console.log(props.one, props.two) // 1 2
    console.log(attrs.desc) // 没有用props接收到的属性可以在context.attrs中拿到
    console.log(slots.default())
    emit('myprint', '向父组件传数据')
  },

  beforeCreate () {
    console.log('beforeCreate()---')
  },
  created () {
    console.log('created ()---')
    console.log(this) // Proxy{…}
  }
}
</script>

<style scoped>

</style>
