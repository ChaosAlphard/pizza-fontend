<style scoped>

</style>

<template>
  <div>
    <h1>Home</h1>
    <button class="btn btn-success" @click="goToMenu">Let's order!</button>
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
