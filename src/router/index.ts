import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/adminHome',
      name: 'adminHome',
      component: () => import('../views/AdminHome.vue'),
      children: [
        {
          path: 'hospitalList',
          name: 'adminHospitalList',
          component: () => import('@/components/adminComponents/HospitalList.vue')
        },
        {
          path: 'departmentList',
          name: 'adminDepartmentList',
          component: () => import('@/components/adminComponents/DepartmentList.vue')
        }
      ]
    },
    {
      path: '/userHome',
      name: 'userHome',
      component: () => import('../views/UserHome.vue'),
      children: [
        {
          path: 'hospitalList',
          name: 'hospitalList',
          component: () => import('@/components/userComponents/HospitalList.vue')
        },
        {
          path: 'hospitalDetail/:id',
          name: 'hospitalDetail',
          component: () => import('@/components/userComponents/HospitalDetail.vue')
        },
        {
          path: 'userCenter',
          name: 'userCenter',
          component: () => import('@/components/userComponents/UserCenter.vue')
        }
      ]
    }
  ]
})

export default router
