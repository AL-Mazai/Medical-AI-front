<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

let patientsList=ref([])
let loading=ref()

onMounted(()=>{
  loading.value=true
  getPatientsList();
})

async function getPatientsList(){

  await axios.get("/getPatients").then((response)=>{
    console.log(response.data)
    patientsList.value=response.data
    loading.value=false

  })

}
</script>

<template>

    <el-table :data="patientsList" v-loading="loading" style="width: 100%" border stripe>
      <el-table-column prop="patient_id" label="编号" width="180" />
      <el-table-column prop="username" label="姓名" width="180" />
      <el-table-column prop="gender" label="性别" />
      <el-table-column prop="address" label="住址" />
      <el-table-column prop="phone_number" label="电话号码" />
    </el-table>

</template>

<style scoped>

</style>