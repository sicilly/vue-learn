<template>
  <div class="home">
    <h1>原来的写法</h1>
    <h3>count: {{ count }}</h3>
    <h3>double: {{ double }}</h3>
    <button @click="add">增加</button>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data () {
    return {
      count: 0
    }
  },
  computed: {
    double () {
      return this.count * 2
    }
  },
  methods: {
    add () {
      this.count++
    }
  }
}
</script>
