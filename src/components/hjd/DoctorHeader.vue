<script setup>
import {computed} from "vue";
import {useRouter} from "vue-router";

const router=useRouter();
// const routeName = ref(router.currentRoute.value.name);
const routeName = computed(()=>{return router.currentRoute.value.meta.title})
</script>

<template>
  <el-card class="box-card" :body-style="{display:'flex',justifyContent:'space-between'}">
    <span class="text">{{ routeName }}</span>
    <el-dropdown class="el-drop" >
      <span class="el-dropdown-link">
       <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item >退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-card>
</template>

<style scoped>

</style>