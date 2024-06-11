<script setup>

import axios from "axios";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {ElLoading} from "element-plus";
import Ai from "../Ai.vue";
const router = useRouter(); // 获取当前路由信息
const diagnosisId=ref()
const diagnosisDetail=ref({})
const uploadInput=ref()
const drugs=ref([])
const patientDrugs = ref([])
const previousDrugs= ref([]) // 之前选中的药物ID数组
const url_1=ref('')

const url_2=ref('')

const diseases=ref([])
let dialogFormVisible=ref(false)
const diagnosisList=ref([])
let AiContent=ref("")

let tableLoading=ref(true)

onMounted(()=>{
  // console.log(router.currentRoute.value.query.diagnosisId);
  diagnosisId.value = router.currentRoute.value.query.diagnosisId;
  getDiagnosisDetail(diagnosisId.value)
  getAllDiseases()
  // url_1.value=diagnosisDetail.value.original_image_link
  // url_2.value=diagnosisDetail.value.mark_image_link

})
function getAllDiseases(){
  axios({
    method:"GET",
    url:"/getAllDiseases",

  }).then((response)=>{
    console.log(response,666)
    diseases.value=response.data
  })
}

 function getDiagnosisDetail(id){
  console.log(id)
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  // setTimeout(() => {
  //   loading.close()
  // }, 2000)
   axios({
    method:"GET",
    url:"/getDiagnosisDetail",
    params:{
      diagnosisId:id
    }
  }).then((response)=>{
    console.log(response.data)
    diagnosisDetail.value=response.data.records[0]
    url_1.value=diagnosisDetail.value.original_image_link
    url_2.value=diagnosisDetail.value.mark_image_link
    drugs.value=response.data.drugs
    patientDrugs.value = response.data.patient_drugs;
    previousDrugs.value=patientDrugs.value

// 遍历每个药品，检查是否在 patient_drugs 中
    drugs.value.forEach(drug => {
      // 判断当前药品是否在 patient_drugs 中
      const isDrugInPatient = patientDrugs.value.some(patientDrug => patientDrug.drugId === drug.drugId);

      // 根据是否存在设置药品的 value
      drug.selected = isDrugInPatient ? 1 : 0;
    });

// 打印更新后的 drugs 数组
    console.log(drugs.value);
    loading.close()
  })
}


async function save(){
  console.log(diagnosisId.value,diagnosisDetail.value.diagnose_result,diagnosisDetail.value.illness_description)
  const loading = ElLoading.service({
    lock: true,
    text: 'Saving',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  let formData = new FormData();

// 添加数据到 FormData 对象
  formData.append('diagnosisId', diagnosisId.value);
  formData.append('diagnose_result', diagnosisDetail.value.diagnose_result);
  formData.append('illness_description', diagnosisDetail.value.illness_description);
  formData.append('treatment_plan', diagnosisDetail.value.treatment_plan);
  formData.append('original_image_link', url_1.value);
  formData.append('mark_image_link', url_2.value);
  await axios({
    url: '/updateDiagnosisDetail',
    method: 'POST',
    data: formData
  }).then((response)=>{
    console.log(response.data)
    loading.close()

  })
}

const upload= () => {
  const input = uploadInput.value;
  input.click();
};
const true_upload = (event) => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Uploading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  const file = event.target.files[0];
  // if (!file) return;
  console.log(file)
  let param = new FormData() //创建form对象
  param.append('file', file, file.name) //通过append向form对象添加数据
  // console.log(param.get("file")); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
  // const timer = setInterval(() => {
  //   this.myFunc()
  // }, 30);
  let config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  } //添加请求头
  axios.post('/image', param, config)
      .then((response) => {
        console.log(response)
        url_1.value=response.data.image_base64
        url_2.value=response.data.draw_base64
        loading.close()
      })
};
async function generate() {
  let formData = new FormData();
  const loading = ElLoading.service({
    lock: true,
    text: 'Generating',
    background: 'rgba(0, 0, 0, 0.7)',
  })
// 添加数据到 FormData 对象
  formData.append('diagnose_result', diagnosisDetail.value.diagnose_result);
  formData.append('illness_description', diagnosisDetail.value.illness_description);
  formData.append('treatment_plan', diagnosisDetail.value.treatment_plan);
  // formData.append('original_image_link', url_1.value);
  // formData.append('mark_image_link', url_2.value);
  await axios({
    url: '/AIGenerate',
    method: 'POST',
    data: formData
  }).then((response) => {
    console.log(response.data)
    AiContent.value=response.data
    loading.close()

  })
}

function handleSelectChange(newSelection) {
  const added = newSelection.filter(id => !previousDrugs.value.includes(id));
  const removed = previousDrugs.value.filter(id => !newSelection.includes(id));
  let formData = new FormData();
  // console.log(diagnosisDetail.value.patient_id,added[0])

  if(added.length!=0){
    formData.append('patientId',diagnosisDetail.value.patient_id)
    formData.append('drugId',added[0])
    console.log('新选中的药物ID:', added);
    axios({
      url: '/addAllergicDrug',
      method: 'POST',

      data: formData
    }).then((response) => {
      console.log(response.data)
    })
  }
  if(removed.length!=0){
    formData.append('patientId',diagnosisDetail.value.patient_id)
    formData.append('drugId',removed[0])
    console.log('删除的药物ID:', removed);
    axios({
      url: '/deleteAllergicDrug',
      method: 'POST',

      data: formData
    }).then((response) => {
      console.log(response.data)
    })
  }
  // 更新previousDrugs为当前选中的药物
  previousDrugs.value = newSelection
}

function pastMedicalHistory(){
  dialogFormVisible.value=true
  let formData = new FormData();

  formData.append('patientId',diagnosisDetail.value.patient_id)
  formData.append('diagnoseId',diagnosisDetail.value.diagnose_record_id)
  axios({
    url:'/getDiseasesHistory',
    method:"POST",
    data:formData
  }).then(res=>{
    console.log(res)
    diagnosisList.value=res.data
    tableLoading.value=false
  })
}
</script>

<template>

  <el-card class="box-card" >
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>患者诊断信息</span>
        <div>
          <el-button @click="pastMedicalHistory">查看以往病史</el-button>
          <el-button @click="save">保存</el-button>
        </div>

      </div>
    </template>
    <el-col >
      <el-row>
        <el-col :span="8">姓名:{{diagnosisDetail.username}}</el-col>
        <el-col :span="8">性别:{{diagnosisDetail.gender}}</el-col>
        <el-col :span="8">年龄:{{diagnosisDetail.age}}</el-col>
        <el-col :span="8">联系电话:{{ diagnosisDetail.phone_number }}</el-col>
        <el-col :span="8">住址:{{ diagnosisDetail.address }}</el-col>

      </el-row>
      <el-row>
        <el-col :span="8">
          <div style="display: flex">
            <el-text style="width: 200px;">过敏源:</el-text>
            <el-select
                v-model="patientDrugs"
                multiple
                collapse-tags
                collapse-tags-tooltip
                placeholder="Select"
                popper-class="custom-header"
                :max-collapse-tags="3"
                style="width: 1000px"
                @change="handleSelectChange"
            >
              <el-option
                  v-for="item in drugs"
                  :key="item.drugId"
                  :label="item.drugName"
                  :value="item.drugId"
              />
            </el-select>
          </div>
          </el-col>
      </el-row>
    </el-col>


  </el-card>


  <el-row>
    <el-col :span="12" >
      <el-card  style="height:70px;display: flex; align-items: center">
        <span>诊断编号:{{diagnosisDetail.diagnose_record_id}}</span>

      </el-card>

    </el-col>
    <el-col :span="12"   style="height:70px;">
      <el-card  style="height:70px;">
        <span>诊断结果:
<!--          <el-input-->
<!--            v-model="diagnosisDetail.diagnose_result"-->

<!--            style="width: 240px"-->
<!--            size="large"-->
<!--            placeholder="Please Input"-->

<!--        />-->
          <el-select
              v-model="diagnosisDetail.diagnose_result"
              filterable
              remote
              reserve-keyword
              placeholder="Please enter a keyword"
              :remote-method="remoteMethod"
              :loading="loading"
              style="width: 240px"
          >
        <el-option
            v-for="item in diseases"
            :key="item.diseaseId"
            :label="item.diseaseName"
            :value="item.diseaseName"
        />
        <template #loading>
          <svg class="circular" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" />
          </svg>
        </template>
      </el-select>
        </span>
      </el-card>
    </el-col>
  </el-row>


  <el-row>
    <el-col :span="12" >
      <el-card >
        <template #header>
          诊断描述
        </template>
        <div>
          <el-input
              v-model="diagnosisDetail.illness_description"
              type="textarea"
              style="width: 100%"
              size="large"
              placeholder="Please Input"/>
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <template #header>
          治疗建议
        </template>
        <div>
          <el-input
              v-model="diagnosisDetail.treatment_plan"
              type="textarea"
              style="width: 100%"
              size="large"
              placeholder="Please Input"/>
        </div>
      </el-card>
    </el-col>
  </el-row>


<!--  <el-row>-->
<!--    <el-col :span="24">-->
<!--      <el-card>-->
<!--        <template #header>-->
<!--          <div style="display: flex; justify-content: space-between; align-items: center;height: 30px">-->
<!--            AI诊断文档生成:-->
<!--            <el-button type="primary" @click="generate">-->
<!--              生成-->
<!--            </el-button>-->
<!--          </div>-->
<!--        </template>-->
<!--        <el-text>{{AiContent}}</el-text>-->

<!--      </el-card>-->

<!--    </el-col>-->
<!--  </el-row>-->
  <el-row>


    <el-col :span="12">
        <el-card>
          <template #header>
            <div style="display: flex; justify-content: space-between; align-items: center;height: 30px">
              原始图片:
              <el-button type="primary" @click="upload">
                上传文件
                <input ref="uploadInput" name="file" type="file" style="display: none" @change="true_upload" />
              </el-button>
            </div>
          </template>
          <div>
            <span v-if="url_1==''">暂未上传图片</span>
            <img style="width: 100%" v-else :src="url_1"/>

          </div>


        </el-card>
    </el-col>




    <el-col :span="12">
      <el-card>
        <template #header>
          <div style="display: flex; justify-content: space-between; align-items: center;height: 30px">
            标记图片:
<!--            <el-button type="primary" @click="save">预测</el-button>-->
          </div>
        </template>
        <div>
          <span v-if="url_2==''">暂未上传图片</span>
          <img style="width: 100%" v-else :src="url_2">
<!--            <img src="/src/assets/img.png">-->

        </div>


      </el-card>
      </el-col>


  </el-row>

<el-dialog v-model="dialogFormVisible" title="以往病史">
  <el-table :data="diagnosisList" v-loading="tableLoading" style="width: 100%" border stripe>
    <el-table-column prop="diagnose_result" label="诊断结果" width="180" />
    <el-table-column prop="illness_description" label="诊断描述" width="180" />
    <el-table-column prop="treatment_plan" label="治疗方案" />
  </el-table>
</el-dialog>


</template>

<style scoped lang="scss" >

.box-card .el-card__header {
  background-color: #409EFF;
  color: #fff;
}
.el-row {

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