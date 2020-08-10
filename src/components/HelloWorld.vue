<template>
  <div class="hello">
    <div class="title">
      <img src="../assets/logo.png" alt="">
    </div>
    <input type="text" class="search" v-model="searchName">
    <div class="change">
      <span @click="changeMenu(0)" v-if="isChange">变身</span>
      <span @click="changeMenu(1)" v-if="!isChange">变身</span>
    </div>
    <ul class="data" v-if="searchName">
      <li class="list">
        <span class="icon">{{searchName}}</span>
        <span class="name">2</span>
        <span class="path">3</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { ipcRenderer } from 'electron'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string
  private isChange = true
  private searchName = ''
  changeMenu (type: number) {
    this.isChange = !this.isChange
    ipcRenderer.send('showMenu', type)
  };

  @Watch('searchName')
  changeInput (newVal: string) {
    ipcRenderer.send('setMainWindow', { width: newVal ? 500 : 0, pathName: newVal })
  };
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello{
  position: relative;
  display:flex;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 3px solid red;
  box-shadow: 0 0 0 2px rgba(235, 38, 31, 0.2);
  .search {
    caret-color:yellow;
    width: 86%;
    height: 80px;
    line-height: 80px;
    border: 1px solid #e8e8e8;
    padding: 1px 20px;
    font-size: 3rem;
    &:hover{
      border-color: #57a3f3;
      // box-shadow: 0 0 0 2px rgba(45,140,240,.2);
    }
  }
  .title{
    width: 7%;
    cursor: pointer;
    -webkit-app-region: drag;
    img{
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  .change{
    width: 7%;
    background: #57a3f3;
    border:1px salmon solid;
    width: 100px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    span{
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
  .data{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 132;
    background: yellow;
    height: 500px;
  }
}
</style>
