<script setup>

import axios from "axios";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {ElLoading} from "element-plus";
const router = useRouter(); // 获取当前路由信息
const diagnosisId=ref()
const diagnosisDetail=ref({})
let result=ref("")
let description=ref("")


// let loading=ref(true)

onMounted(()=>{
  // console.log(router.currentRoute.value.query.diagnosisId);
  diagnosisId.value = router.currentRoute.value.query.diagnosisId;
  getDiagnosisDetail(diagnosisId.value)
})

async function getDiagnosisDetail(id){
  console.log(id)
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  // setTimeout(() => {
  //   loading.close()
  // }, 2000)
  await axios({
    method:"GET",
    url:"/getDiagnosisDetail",
    params:{
      diagnosisId:id
    }
  }).then((response)=>{
    console.log(response.data)
    diagnosisDetail.value=response.data[0]
    loading.close()
  })
}

async function save(){
  console.log(diagnosisDetail.value.diagnose_result,diagnosisDetail.value.illness_description)
  const loading = ElLoading.service({
    lock: true,
    text: 'Saving',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  await axios({
    url:'/updateDiagnosisDetail',
    method:"PUT",
    params:{
      diagnosisId:diagnosisId.value,
      diagnose_result:diagnosisDetail.value.diagnose_result,
      illness_description:diagnosisDetail.value.illness_description,
      treatment_plan:diagnosisDetail.value.treatment_plan,
    }
  }).then((response)=>{
    console.log(response.data)
    loading.close()

  })
}
</script>

<template>

  <el-card class="box-card" >
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>患者诊断信息</span>
        <el-button @click="save">保存</el-button>
      </div>
    </template>
    <el-row>
      <el-col :span="8">姓名:{{diagnosisDetail.username}}</el-col>
      <el-col :span="8">性别:{{diagnosisDetail.gender}}</el-col>
      <el-col :span="8">年龄:{{diagnosisDetail.age}}</el-col>
      <el-col :span="8">联系电话:{{ diagnosisDetail.phone_number }}</el-col>
      <el-col :span="8">住址:{{ diagnosisDetail.address }}</el-col>
    </el-row>
  </el-card>


  <el-row>
    <el-col :span="12" >
      <el-card  style="height:70px;display: flex; align-items: center">
        <span>诊断编号:{{diagnosisDetail.diagnose_record_id}}</span>

      </el-card>

    </el-col>
    <el-col :span="12"   style="height:70px;">
      <el-card  style="height:70px;">
        <span>诊断结果: <el-input
            v-model="diagnosisDetail.diagnose_result"

            style="width: 240px"
            size="large"
            placeholder="Please Input"

        /></span>
      </el-card>
    </el-col>
  </el-row>


  <el-row>
    <el-col :span="24">
      <el-card>
        <template #header>
          诊断描述
        </template>
        <div>
          <el-input
              v-model="diagnosisDetail.illness_description"

              style="width: 100%"
              size="large"
              placeholder="Please Input"/>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="24">
      <el-card>
        <template #header>
          治疗建议
        </template>
        <div>
          <el-input
              v-model="diagnosisDetail.treatment_plan"

              style="width: 100%"
              size="large"
              placeholder="Please Input"/>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-row>


    <el-col :span="12">
        <el-card>
          <template #header>
            原始图片:
          </template>
          <div>

              <img src="/src/assets/img.png">

          </div>


        </el-card>
    </el-col>




    <el-col :span="12">
      <el-card>
        <template #header>
          标记图片:
        </template>
        <div>

            <img src="/src/assets/img.png">

        </div>


      </el-card>
      </el-col>


  </el-row>




</template>

<style lang="scss">

.box-card .el-card__header {
  background-color: #409EFF;
  color: #fff;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  margin: 5px 0;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>