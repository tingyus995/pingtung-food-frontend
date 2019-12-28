import Vue from "vue";
import VueRouter from "vue-router";

// student
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import FoodList from "../views/FoodList.vue";
import AddFood from "../views/AddFood.vue";
import Signup from "../views/Signup.vue";
import Cart from "../views/Cart.vue";
import Favorites from "../views/Favorites.vue";
import Profile from "../views/Profile.vue";
import OrderHistory from "../views/OrderHistory.vue";
import ForgetPassword from "../views/ForgetPassword.vue";

// shop

import OrderList from "../views/OrderList.vue";
import ShopSignup from "../views/ShopSignup.vue";
import ShopLogin from "../views/ShopLogin.vue"
import EditFood from "../views/EditFood.vue"
import MyFoods from "../views/MyFoods.vue"
import ShopProfile from "../views/ShopProfile.vue";
import ShopForgetPassword from "../views/ShopForgetPassword.vue";


// bootstrap
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/foods",
    name: "foods",
    component: FoodList
  },

  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/forgetpassword",
    name: "forgetpassword",
    component: ForgetPassword
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart
  },
  {
    path: "/favorites",
    name: "favorites",
    component: Favorites
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/orderhistory",
    name: "orderhistory",
    component: OrderHistory
  },

  {
    path: '*',
    redirect: '/',
  },



  {
    path : '/shop/signup',
    name : "shopsignup",
    component: ShopSignup
  },
  {
    path : '/shop/orders',
    name : 'orderlist',
    component: OrderList
  },
  {
    path: "/shop/addfood",
    name: "addfood",
    component: AddFood
  },
  {
    path :"/shop/editfood",
    name :"editfood",
    component: EditFood,
    props : true
  },
  {
    path : "/shop/myfoods",
    name : "myfoods",
    component: MyFoods
  },
  {
    path : "/shop/profile",
    name : "shopprofile",
    component: ShopProfile
  },
  {
    path: "/shop/login",
    name: "shoplogin",
    component: ShopLogin
  },
  {
    path: "/shop/forgetpassword",
    name: "shopforgetpassword",
    component: ShopForgetPassword
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next)=>{
  
  let guest_allowed_paths = ['/login', '/forgetpassword', '/signup', '/', '/shop/signup', '/shop/login','/shop/forgetpassword']
  
  
  const isLogin = localStorage.getItem('token') != null;
  if( isLogin ){
    next();
  } else {
    if(guest_allowed_paths.indexOf(to.path) === -1)
      next('/login');
    else
      next();
  }
});
export default router;
