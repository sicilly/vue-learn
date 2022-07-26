<template>
  <div class="about">
    <h1>组合式api的写法</h1>
    <h3>count:{{ data.count }}</h3>
    <h3>double:{{ data.double}}</h3>
    <button @click="add">增加</button>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  setup () {
    const data = reactive({
      count: 0,
      double: computed(() => data.count * 2)
    })
    function add () {
      data.count++
    }
    return { data, add }
  }
}
</script>
