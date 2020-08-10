<template>
  <div class="home">
    <div class="drag">
      <span class="title">千寻</span>
    </div>
    <HelloWorld />
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
<style lang="less" scoped>
  .drag{
    -webkit-app-region: drag;
    display:inline-block;
    cursor: pointer;
    font-size: 18px;
    height: 38px;
    line-height: 38px;
    width: 100%;
    background: red;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    opacity: 0.8;
    position: relative;
    .title{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      text-align: center;
      color: #fff;
    }
  }
</style>
