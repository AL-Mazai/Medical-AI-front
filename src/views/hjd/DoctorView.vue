<script setup>

import DoctorTab from "../../components/hjd/DoctorTab.vue";
import DoctorHeader from "../../components/hjd/DoctorHeader.vue";

</script>

<template>
  <div class="container">
    <DoctorTab/>
    <div class="router-view-container">
      <doctor-header />
      <div class="pos">
        <router-view/>
      </div>

    </div>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  height: 100vh;
}

.router-view-container {
  flex: 1;
  overflow-y: auto;

}
.fixed-header {
  position: fixed;
  //top: 0;
  //left: 0;
  width: calc(100% - 250px); /* 250px 是 DoctorTab 的宽度，根据实际情况调整 */
  //z-index: 1000;
  background-color: #fff; /* 背景颜色根据实际情况调整 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}
.pos{

}

</style>