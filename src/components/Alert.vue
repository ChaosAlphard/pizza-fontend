<template>
  <transition-group name="fade" class="alert-group">
    <span class="alert-msg" v-for="(item) of msg" :key="item[0]">{{item[1]}}</span>
  </transition-group>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    msg: {
      get(): string[][] {
        return this.$store.getters.getMsgs
      },
      set() {}
    }
  }
})
</script>

<style scoped>
.fade-enter {
  opacity: 0;
  transform: translateY(30px);
}
.fade-leave-active {
  opacity: 0;
  transform: translateY(-30px);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s, transform .2s;
}

.alert-group {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20%; left: 50%;
  transform: translate(-50%, -50%);
}
.alert-msg {
  font-size: 18px;
  padding: 5px 10px;
  color: #FFF;
  background: #0008;
  border-radius: 8px;
  position: absolute;
}
</style>
