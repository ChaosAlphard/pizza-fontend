<template>
  <div class="row mt-3">
    <div class="col-md-12 col-lg-12">
      <div class="card">

        <div class="card-body">
          <!-- <img src="../assets/logo.png" class="mx-auto d-block"> -->
          <Logo/>

          <form @submit.prevent="login">
            <div class="form-group">
              <label for="email">邮箱</label>
              <input type="email" class="form-control" v-model="email">
            </div>

            <div class="form-group">
              <label for="password">密码</label>
              <input type="password" class="form-control" v-model="password">
            </div>

            <button class="btn btn-block btn-success" type="submit" ref="submit">登录</button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import getMD5 from '@/plugins/crypto-md5'
import Logo from '@/components/PizzaLogo'

export default Vue.extend({
  data: ()=>({
    email: '',
    password: '',
    timer: null as number|null
  }),
  components: {
    Logo
  },
  methods: {
    login() {
      const submit = this.$refs.submit as HTMLButtonElement
      this.timer = this.temporaryDisableButton(submit, 5000)
      this.$store.dispatch("showAlert","正在登录")

      const pwd = getMD5(this.password)
      axios.post(`/user/login?email=${this.email}&password=${pwd}`)
      .then((res:any)=>{
        if(res.data.code===200){
          const user = res.data.model
          // 登录信息保存到localStorage 中
          // vuex 中操作localStorage, 数据会在退出后被删除
          localStorage.setItem("eml",this.email)
          localStorage.setItem("pwd",pwd)

          // 登录信息保存到Vuex 中
          this.$store.dispatch("setUser",user)
          this.$store.dispatch("showAlert","登录成功")
          if(user.level === 2) { this.pushRouter() }
          this.$router.replace({name: "menu"})
        } else {
          // 登录失败则表明信息有误, 删除保存的信息
          localStorage.removeItem("eml")
          localStorage.removeItem("pwd")
          // 清空Vuex 中的信息
          this.$store.dispatch("setUser",null)
          this.$store.dispatch("showAlert",`${res.data.code}: ${res.data.msg}`)
          this.enableButtonAndClearTimer(submit)
        }
      }).catch((err:any)=>{
        clearTimeout(this.timer as number)
        this.enableButtonAndClearTimer(submit)
        this.$store.dispatch("showAlert", "网络异常")
      })
    },
    pushRouter() {
      this.$router.addRoutes([{
        path: '/admin',
        name: 'admin',
        component: () => import('@/views/Admin')
      }])
    },
    temporaryDisableButton(submit: HTMLButtonElement, time: number): number {
      submit.disabled = true
      return setTimeout(() => {
        submit.disabled = false
      }, time);
    },
    enableButtonAndClearTimer(submit: HTMLButtonElement) {
      clearTimeout(this.timer as number)
      this.timer = null
      submit.disabled=false
    }
  },
  // beforeRouteEnter:(to, from, next) => {
  //   next(vm => {})
  // }
})
</script>
