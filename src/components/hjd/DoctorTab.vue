<script setup>
import {
  Document,
  Menu as IconMenu,
  List,
} from '@element-plus/icons-vue'



</script>

<template>
  <el-row class="tac">

    <el-col  class="col">
      <el-menu
          class="el-menu-vertical-demo"
          style="--el-menu-text-color: white;--el-menu-active-color: yellow"
          background-color="yellow"
          active-text-color="pink"
      >
        <div style="padding:  20px ;display: flex;justify-content: center;align-items: center">
          <img style="width: 20px;height: 20px;margin-right: 5px" src="../../assets/vue.svg">
          <text style="color: white">医疗诊断系统</text>
        </div>
        <el-menu-item  >
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>病人列表</span>
          </template>
        </el-menu-item>
        <el-menu-item >
          <template #title>
            <el-icon><List /></el-icon>
            <span>诊断列表</span>
          </template>
        </el-menu-item>

        <el-menu-item >
          <el-icon><document /></el-icon>
          <span>Ai诊断</span>
        </el-menu-item>



      </el-menu>

    </el-col>
  </el-row>
</template>

<style scoped>
.tac{
  min-height: 100vh;
  margin-right: 10px;
  width: 200px;
}
.tac .col{
  min-height: 100vh;
  color: white;

}
.tac .col .el-menu-vertical-demo{
  min-height: 100vh;
  width: 100%;
  background-color: #545c64;
  color: white;
}
</style>

