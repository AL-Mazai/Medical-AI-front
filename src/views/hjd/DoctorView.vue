<script setup>

import DoctorTab from "../../components/hjd/DoctorTab.vue";
import DoctorHeader from "../../components/hjd/DoctorHeader.vue";
</script>

<template>
  <div class="container">
    <DoctorTab/>
    <div class="router-view-container">
      <doctor-header/>
      <router-view/>
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
  overflow-y: auto; /* 可以根据需要添加滚动条 */
}
</style>