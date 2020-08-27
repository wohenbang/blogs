import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/Home.vue')
const Category = () => import('views/Category.vue')
const Tags = () => import('views/Tags.vue')
const Memory = () => import('views/Memory.vue')
const Login = () => import('views/Login.vue')

const Admin = () => import('views/Admin/Admin.vue')
const UserList = () => import('views/Admin/children/UserList.vue')
const UserAdd = () => import('views/Admin/children/UserAdd.vue')
const BlogList = () => import('views/Admin/children/BlogList.vue')
const Writing = () => import('views/Admin/children/Writing.vue')

Vue.use(VueRouter)

const routes = [
  {
    name: 'default',
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/tags',
    name: 'Tags',
    component: Tags
  },
  {
    path: '/memory',
    name: 'Memory',
    component: Memory
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: '',
        redirect: 'user'
      },
      {
        path: 'user',
        component: UserList
      },
      {
        path: 'useradd',
        component: UserAdd
      },
      {
        path: 'blog',
        component: BlogList
      },
      {
        path: 'writing',
        component: Writing
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
