<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {Search} from "@element-plus/icons-vue";
import { useRouter } from 'vue-router';
import {ElLoading} from "element-plus";

let diagnosisList=ref([])
let loading=ref()
let currentPage=ref(1);
let pageSize=ref(10);
let total=ref(0)
// let input=ref("");
const router=useRouter()

const user=JSON.parse(sessionStorage.getItem("user"))

onMounted(()=>{

  getDiagnosisList();
})

async function getDiagnosisList(){
  loading.value=true
  // await axios.get("/getPatients").then((response)=>{
  //   console.log(response.data)
  //   patientsList.value=response.data
  //   loading.value=false
  //
  // })
  await axios({
    method:"GET",
    url:"/getTobeDiagnosed",
    params:{
      page:currentPage.value,
      page_size:pageSize.value,
      doctorId:user[0].doctor_id
    }
  }).then((response)=>{
    console.log(response.data)
    diagnosisList.value=response.data.records
    total.value=response.data.total_count
    loading.value=false
  })

}

// function clear(){
//   input.value='';
//   getDiagnosisList()
// }

async function deleteDiagnosisDetail(id){
  console.log("delete",id)
  const loading = ElLoading.service({
    lock: true,
    text: 'Deleting',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  // setTimeout(() => {
  //   loading.close()
  // }, 2000)
  await axios({
    method:"PUT",
    url:"/deleteDiagnosisDetail",
    params:{
      diagnosisId:id
    }
  }).then((response)=>{
    console.log(response.data)
    getDiagnosisList()
    loading.close()
  })

}


function handleSizeChange(number){
  // console.log(number)

  pageSize.value=number
  getDiagnosisList()
}

function handleCurrentChange(number){
  // console.log(number)

  currentPage.value=number
  getDiagnosisList()
}
function gotoDiagnosisDetail(id){
  console.log(id)
  // await axios({
  //   method:"GET",
  //   url:"/getDiagnosisDetail",
  //   params:{
  //     diagnosisId:id
  //   }
  // }).then((response)=>{
  //   console.log(response.data)
  //
  // })
  router.push({ path: '/DoctorView/DiagnosisDetail', query: { diagnosisId: id } });

}


</script>

<template>
<!--  <div>-->
<!--    <el-input-->
<!--        v-model="input"-->
<!--        style="width: 240px;margin: 10px 5px"-->
<!--        placeholder="搜索病人姓名"-->
<!--        :prefix-icon="Search"-->
<!--    />-->
<!--    <el-button color="#21B3B9" style="color:white;" @click="getDiagnosisList">搜索</el-button>-->
<!--    <el-button type="danger" @click="clear">清除</el-button>-->
<!--  </div>-->
  <el-table :data="diagnosisList" v-loading="loading" style="width: 100%" border stripe>
    <el-table-column prop="diagnose_record_id" label="诊断编号" width="150" />
    <el-table-column prop="username" label="姓名" width="110" />
    <el-table-column prop="gender" label="性别" width="90" />
    <el-table-column prop="diagnose_result" label="诊断结果" />
    <el-table-column prop="phone_number" label="操作" >
      <template v-slot="scope">
      <el-button type="success" @click="gotoDiagnosisDetail(scope.row.diagnose_record_id)">
        <el-icon style="margin-right: 5px" ><View /></el-icon> 查看
      </el-button>
        <el-popconfirm title="Are you sure to delete this?" @confirm="deleteDiagnosisDetail(scope.row.diagnose_record_id)">
          <template #reference>
            <el-button type="danger" >
              <el-icon style="margin-right: 5px"><Delete /></el-icon> 删除
            </el-button>
          </template>
        </el-popconfirm>

<!--      <el-button type="danger" @click="deleteDiagnosisDetail(scope.row.diagnose_record_id)">-->
<!--        <el-icon style="margin-right: 5px"><Delete /></el-icon> 删除-->
<!--      </el-button>-->
      </template>
    </el-table-column>
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