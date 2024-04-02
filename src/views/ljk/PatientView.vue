<script setup>

</script>

<template>
  <div class="common-layout">
    <el-container>
        <el-row style="box-shadow: 0 2px 10px 0 rgba(0,0,0,.05);height: 10vh;">
          <el-col :span="1">&nbsp</el-col>
          <el-col :span="4" >
            <p class="title">病人诊疗系统</p>
          </el-col>
        </el-row>
      <el-main
          style="background: #f9f9f9"
      >
<!--        <el-row>-->
<!--          <p class="title">健康医典</p>-->
<!--          <p class="description1">&nbsp;|&nbsp;权威专家&nbsp;|&nbsp;权威机构&nbsp;|&nbsp;三审三校    </p>-->
<!--        </el-row>-->
      </el-main>
      <el-footer>
<!--        Footer-->
      </el-footer>
    </el-container>
  </div>
  <video
      src="https://prod-streaming-video-msn-com.akamaized.net/bc3e9341-3243-4d2c-8469-940fef56ca2d/4720a02b-eabd-4593-a1d9-5c5d61916853.mp4"
      style="position: fixed;width: 100vw;top: 11vh ;z-index: -1"
  >
  </video>
</template>

<style scoped>
.title{
  font-size: 2.8vh;
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center;
}
.description1{
  font-size: 1.8vh;
  font-weight: lighter;
  display: flex;
  align-items: center;
  justify-content: center;
}
.common-layout{
  display: flex;
  align-items: center;
  justify-content: center;
 }
</style>