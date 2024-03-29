import { createRouter, createWebHistory } from 'vue-router'

import DoctorView from "../views/hjd/DoctorView.vue";
import Ai from "../components/Ai.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/',
            redirect:'/DoctorView'
        },
        {
            path: '/Ai',
            component: Ai,
            meta: { title: '肿瘤辅助诊断系统' }

        },
        {
            path:'/DoctorView',
            component:DoctorView,
            meta:{
                title: "医生界面"
            }
        }
    ]
})

export  default  router