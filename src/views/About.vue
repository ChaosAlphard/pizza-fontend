<template>
  <div class="row mb-5">
    <div class="col-4">
      <div class="list-group mb-5">
        <router-link tag="li" class="nav-link" :to="{name:'contact'}">
          <a class="list-group-item list-group-item-action">联系我们</a>
        </router-link>
        <router-link tag="li" class="nav-link" :to="{name:'delivery'}">
          <a class="list-group-item list-group-item-action">快递信息</a>
        </router-link>
        <router-link tag="li" class="nav-link" :to="{name:'guide'}">
          <a class="list-group-item list-group-item-action">使用指导</a>
        </router-link>
      </div>
    </div>
    <div class="col-8 cont">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'About'
})
</script>

<style scoped>
.cont {
  margin-top: 10px;
}
</style>
