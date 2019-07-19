<template>
  <div class="text-center">
    <h1>没有找到指定的资源</h1>
    <h3>{{sec}}秒后回到主页</h3>
    <div>
      <router-link class="btn btn-success btn-lg" :to="{name:'home'}"
      replace tag="button">点我返回</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: ()=>({
    sec: 5,
    timer: null as null|number,
    homeTimer: null as null|number,
  }),
  mounted() {
    this.homeTimer = setTimeout(() => {
      this.$router.replace({name: 'home'})
    }, 5000);
    this. timer = setInterval(() => {
      this.sec--
    }, 1000);
  },
  beforeRouteLeave(to, from, next) {
    try{
      clearTimeout(this.homeTimer as number)
      clearInterval(this.timer as number)
      this.timer = null
    } finally {
      next()
    }
  }
})
</script>
