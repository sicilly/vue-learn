<template>
  <div>
    常用api的应用
    {{ num }}
    {{ myfun() }}
  </div>
</template>

<script>
export default {
  name: 'com-api',
  setup () {
    const num = 1
    const myfun = () => {
      console.log(num)
    }
    return {
      num,
      myfun
    }
  }
}
</script>

<style>

</style>
