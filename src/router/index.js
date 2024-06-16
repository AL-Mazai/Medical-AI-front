import { createRouter, createWebHistory } from 'vue-router'

import DoctorView from "../views/hjd/DoctorView.vue";
import Ai from "../components/Ai.vue";
import PatientsList from "../components/hjd/PatientsList.vue";
import PatientView from "../views/ljk/PatientView.vue";
import DiagnosisList from "../components/hjd/DiagnosisList.vue";
import Login from "../views/hjd/Login.vue";
import DiagnosisDetail from "../components/hjd/DiagnosisDetail.vue";
import AiTalk from "../components/hjd/AiTalk.vue";
import ToBeDiagnosed from "../components/hjd/ToBeDiagnosed.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/',
            redirect:'/Login'
        },
        // {
        //     path: '/Ai',
        //     component: Ai,
        //     meta: { title: '肿瘤辅助诊断系统' }
        //
        // },
        {
          path:'/login',
          component:Login,
          meta:{
              title:"登陆界面"
}
        },
        {
            path:'/DoctorView',
            component:DoctorView,
            meta:{
                title: "医生界面"
            },
            children:[
                {

                    path:'AiTalk',
                    component:AiTalk,
                    meta: { title: 'Ai问诊' }
                },
                {

                    path:'Ai',
                    component:Ai,
                    meta: { title: '医学图像诊断系统' }
                },
                {

                    path:'PatientsList',
                    component:PatientsList,
                    meta: { title: '病人列表' }
                },
                {
                    path:'DiagnosisList',
                    component:DiagnosisList,
                    meta:{title: '诊断列表'}
                },
                {
                    name:"",
                    path:'DiagnosisDetail',
                    component:DiagnosisDetail,
                    meta:{title: '诊断详情'}
                },
                {
                    path:'TobeDiagnosed',
                    component:ToBeDiagnosed,
                    meta:{title: '待诊断'}
                }
            ]
        },
        {
            path:'/Patient',
            component:PatientView,
        }
    ]
})

export  default  router