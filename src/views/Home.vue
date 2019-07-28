<template>
  <div class="row">
    <div class="col-sm-12 text-center home">
      <div class="bg">
        <h1 class="title">🍕Pizza! Pizza! Pizza!🍕</h1>
        <button class="btn btn-success" @click="goToMenu">Let's order!</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Home',
  methods: {
    goToMenu() {
      this.$router.push({name:'menu'})
    }
  }
})
</script>

<style scoped>
.home {
  background: url('https://s2.ax1x.com/2019/07/20/ZzTME4.jpg') no-repeat top center / cover;
  height: 70vh;
  padding: 10%;
}
.bg {
  background-color: #EEEA;
  max-width: 70vw;
  margin: 0 auto;
  padding: 20px 0;
}
.title {
  margin: 10%;
}
</style>
