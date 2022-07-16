<template>
    <div>
        <!-- 可以通过三元表达式，动态绑定 class 的类名 -->
        <!-- <h3 class="thin" :class="isItalic? 'italic': ''">MyStyle 组件</h3> -->
        
        <!-- 如果要动态绑定多个类名，可以使用数组语法 -->
        <!-- <h3 class="thin" :class="[isItalic? 'italic': '', isDelete? 'delete': '']">MyStyle 组件</h3>
        <button @click="isItalic=!isItalic">Toggle Italic</button>
        <button @click="isDelete=!isDelete">Toggle Delete</button> -->

        <!-- 上面数组方式会让结构看起来很臃肿，可以使用对象语法简化 -->
        <h3 class="thin" :class="classObj">MyStyle 组件</h3>
        <!-- 点击一下就取反 -->
        <button @click="classObj.italic=!classObj.italic">Toggle Italic</button>
        <button @click="classObj.delete=!classObj.delete">Toggle Delete</button>
        <hr>
        <!-- :style动态绑定行内样式，看起来像 CSS 但其实是一个 JavaScript 对象 -->
        <div :style="{ color: active, fontSize: fsize + 'px', 'background-color': bgcolor }">hello</div>
        <button @click="fsize+=1">字号 +1</button>
        <button @click="fsize-=1">字号 -1</button>
    </div>
</template>

<script>
export default {
    name: 'MyStyle',
    data() {
        return {
            // 是否倾斜
            isItalic: false,
            isDelete: false,
            // 对象中，属性名是class类名，值是布尔值
            classObj: {
                italic: false,
                delete: false
            },
            active: 'pink',  // 文本颜色
            fsize: 30,  // 字体大小
            bgcolor: 'skyblue',  // 背景颜色
        }
    }
}
</script>

<style lang="less">
// 字体变细
.thin {
    font-weight: 200;
}

// 倾斜字体
.italic {
    font-style: italic;
}
// 删除效果
.delete {
    text-decoration:line-through;
}
</style>
