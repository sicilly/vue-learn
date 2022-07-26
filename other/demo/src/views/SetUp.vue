<template>
  <div>
    setup组件
    <sub-comp one="1" two="2" desc="A" @myprint="print">
        <h2>填充进插槽的内容</h2>
    </sub-comp>
  </div>
</template>

<script>
import SubComp from '../components/SubComp.vue'

export default {
  name: 'set-up',
  components: {
    SubComp
  },
  methods: {
    print (str) {
      console.log(str)
    }
  }
}
</script>

<style>

</style>
