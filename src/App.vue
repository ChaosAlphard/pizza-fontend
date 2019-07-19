<template>
<div id="app">
  <div class="container">
    <nav-header/>
  </div>

  <div class="container">
    <router-view/>
  </div>

  <div class="container cont">
    <div class="row">
      <div class="col-sm-12 col-md-4">
        <router-view name="Guide"/>
      </div>
      <div class="col-sm-12 col-md-4">
        <router-view name="Contact"/>
      </div>
      <div class="col-sm-12 col-md-4">
        <router-view name="Delivery"/>
      </div>
    </div>
  </div>

  <alert/>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavHeader from '@/components/NavHeader'
import Alert from '@/components/Alert'

export default Vue.extend({
  components: {
    NavHeader,
    Alert
  }
})
</script>

<style scoped>
.cont {
  margin-top: 10px;
}
</style>
