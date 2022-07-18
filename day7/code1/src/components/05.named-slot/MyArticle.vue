<template>
  <div>
    <!-- 我们希望把页头放到这里 -->
    <header>
      <!-- 具名插槽 -->
      <slot name="header"></slot>
    </header>
    <!-- 我们希望把主要内容放到这里 -->
    <main>
      <!-- 默认插槽 -->
      <slot></slot>
    </main>
    <!-- 我们希望把页脚放到这里 -->
    <footer>
      <!-- 具名插槽 -->
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'MyArticle',
}
</script>

<style lang="less" scoped>
header,
main,
footer {
  border: 1px dashed #999;
  margin: 30px;
  padding: 40px;
  position: relative;
  &::before {
    position: absolute;
    right: 5px;
    top: 5px;
    font-style: italic;
  }
}

header::before {
  content: 'header 页头';
}
main::before {
  content: 'main 主体内容';
}
footer::before {
  content: 'footer 页脚';
}
</style>
