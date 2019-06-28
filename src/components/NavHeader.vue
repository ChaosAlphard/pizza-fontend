<style scoped>
nav li {
  cursor: pointer;
}
</style>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a href="/" class="navbar-brand">Pizza</a>
      <ul class="navbar-nav">
        <li><router-link class="nav-link" :to="{name:'home'}">主页</router-link></li>
        <li><router-link class="nav-link" :to="{name:'menu'}">菜单</router-link></li>
        <li><router-link class="nav-link" :to="{name:'admin'}">管理</router-link></li>
        <li><router-link class="nav-link" :to="{name:'about'}">关于</router-link></li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li><router-link class="nav-link" :to="{name:'login'}">登录</router-link></li>
        <li><router-link class="nav-link" :to="{name:'register'}">注册</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'NavHeader',
  data: ()=>({
    home: '/',
  })
})
</script>
