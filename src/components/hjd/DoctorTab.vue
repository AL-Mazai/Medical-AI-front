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
          text-color="white"
          background-color="white"
          active-text-color="white"
          router

      >
        <div style="padding:  20px ;display: flex;justify-content: center;align-items: center">
          <img style="width: 20px;height: 20px;margin-right: 5px" src="../../assets/medical.png">
          <text style="color: white">医疗诊断系统</text>
        </div>
<!--        <el-menu-item  index="/DoctorView/PatientsList">-->
<!--          <template #title>-->
<!--            <el-icon><icon-menu /></el-icon>-->
<!--            <span>病人列表</span>-->
<!--          </template>-->
<!--        </el-menu-item>-->
        <el-menu-item index="/DoctorView/TobeDiagnosed">
          <template #title>
            <el-icon><List /></el-icon>
            <span>待诊断</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/DoctorView/DiagnosisList">
          <template #title>
            <el-icon><List /></el-icon>
            <span>诊断列表</span>
          </template>
        </el-menu-item>

        <el-menu-item index="/DoctorView/Ai">
          <el-icon><document /></el-icon>
          <span>Ai诊断</span>
        </el-menu-item>
        <el-menu-item index="/DoctorView/AiTalk">
          <el-icon><document /></el-icon>
          <span>Ai问诊</span>
        </el-menu-item>


      </el-menu>

    </el-col>
  </el-row>
</template>

<style scoped>
.tac{
  height: 100vh;
  margin-right: 10px;

}
.tac .col{
  height: 100vh;
  color: white;
  width: 200px;
}
.tac .col .el-menu-vertical-demo{
  min-height: 100vh;
  width: 100%;
  background-color:#409EFF;
  color: white;
}
</style>

