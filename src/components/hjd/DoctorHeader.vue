<script setup>
import {computed, onMounted} from "vue";
import {useRouter} from "vue-router";

const router=useRouter();
// const routeName = ref(router.currentRoute.value.name);

const user=JSON.parse(sessionStorage.getItem("user"))
const routeName = computed(()=>{return router.currentRoute.value.meta.title})

// onMounted(()=>{
//   console.log(user[0])
// })
function exit() {
  sessionStorage.removeItem("user")
  router.push("/login")
}
</script>

<template>
  <el-card class="box-card" :body-style="{display:'flex',justifyContent:'space-between'}">
    <span class="text">{{ routeName }}</span>
    <el-dropdown class="el-drop" >
      <span class="el-dropdown-link">
        {{ user[0].username }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-card>
</template>

<style scoped>

</style>