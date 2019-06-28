<template>
  <div class="row mb-5">
    <div class="col-4">
      <div class="list-group mb-5">
        <router-link tag="li" class="nav-link" :to="{name:'history'}">
          <a class="list-group-item list-group-i">历史</a>
        </router-link>
      </div>
    </div>
    <div class="col-8">
      <router-view/>
    </div>
    <about/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import About from '../components/about/About.vue'
export default Vue.extend({
  name: 'About',
  components: {
    About
  }
})
</script>
