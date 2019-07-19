<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a href="/" class="navbar-brand"><Logo width="32" height="32"/></a>
      <ul class="navbar-nav">
        <li><router-link class="nav-link" :to="{name:'home'}">主页</router-link></li>
        <li><router-link class="nav-link" :to="{name:'menu'}">菜单</router-link></li>
        <li v-if="user&&user.level===2"><router-link class="nav-link" :to="{name:'admin'}">管理</router-link></li>
        <li><router-link class="nav-link" :to="{name:'about'}">关于</router-link></li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li v-if="!isLogin"><router-link class="nav-link" :to="{name:'login'}">登录</router-link></li>
        <li v-if="!isLogin"><router-link class="nav-link" :to="{name:'register'}">注册</router-link></li>
        <li v-if="isLogin" class="nav-link">{{user.name}}</li>
        <li v-if="isLogin" class="nav-link" @click="logout">注销</li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '@/components/PizzaLogo'

export default Vue.extend({
  name: 'NavHeader',
  computed: {
    user():any {
      return this.$store.getters.getUserInfo
    },
    isLogin():any {
      return this.$store.getters.isLogin
    }
  },
  components: {
    Logo
  },
  methods: {
    logout() {
      if(confirm('确定要退出吗？')) {
        localStorage.removeItem("eml")
        localStorage.removeItem("pwd")
        axios.get('/user/logout')
        .then((res:any)=>{
          console.log("logout")
        }).catch((err:any)=>{
          this.$store.dispatch("showAlert", "网络异常")
        })
        this.$store.dispatch("setUser",null)
        this.$store.dispatch("showAlert", "退出登录")
        this.$router.push({name: 'home'})
      }
    }
  }
})
</script>

<style scoped>
nav li {
  cursor: pointer;
}
</style>