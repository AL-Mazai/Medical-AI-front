<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {Search} from "@element-plus/icons-vue";

let patientsList=ref([])
let loading=ref()
let currentPage=ref(1);
let pageSize=ref(10);
let total=ref(0)
let input=ref("");

onMounted(()=>{

  getPatientsList();
})

async function getPatientsList(){
  loading.value=true
  // await axios.get("/getPatients").then((response)=>{
  //   console.log(response.data)
  //   patientsList.value=response.data
  //   loading.value=false
  //
  // })
  await axios({
    method:"GET",
    url:"/getPatients",
    params:{
      page:currentPage.value,
      page_size:pageSize.value,
      keyword:input.value
    }
  }).then((response)=>{
      console.log(response.data)
      patientsList.value=response.data.patients
      total.value=response.data.total_count
      loading.value=false
  })

}

function clear(){
  input.value='';
  getPatientsList()
}

function handleSizeChange(number){
  // console.log(number)

  pageSize.value=number
  getPatientsList()
}

function handleCurrentChange(number){
  // console.log(number)

  currentPage.value=number
  getPatientsList()
}

</script>

<template>
  <div>
  <el-input
        v-model="input"
        style="width: 240px;margin: 10px 5px"
        placeholder="搜索病人姓名"
        :prefix-icon="Search"
    />
    <el-button color="#21B3B9" style="color:white;" @click="getPatientsList">搜索</el-button>
    <el-button type="danger" @click="clear">清除</el-button>
  </div>
    <el-table :data="patientsList" v-loading="loading" style="width: 100%" border stripe>
      <el-table-column prop="patient_id" label="编号" width="180" />
      <el-table-column prop="username" label="姓名" width="180" />
      <el-table-column prop="gender" label="性别" />
      <el-table-column prop="address" label="住址" />
      <el-table-column prop="phone_number" label="电话号码" />
    </el-table>
  <div style="display: flex;justify-content: center;margin-top: 10px">
    <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[2, 5, 10, 20]"
        layout="total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>


</template>

<style scoped>

</style>