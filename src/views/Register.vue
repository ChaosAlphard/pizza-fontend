<template>
  <div class="row mt-3">
    <div class="col-md-12 col-lg-12">
      <div class="card">

        <div class="card-body">
          <!-- <img src="../assets/logo.png" class="mx-auto d-block"> -->
          <Logo/>

          <form @submit.prevent="register()">
            <div class="form-group">
              <label for="text">称呼</label>
              <input type="text" class="form-control" v-model="user.name"
              placeholder="不超过24个字符，只允许汉字、数字、字母、下划线，不能以下划线开头和结尾"
              pattern="^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]*$">
            </div>

            <div class="form-group">
              <label for="email">邮箱</label>
              <input type="email" class="form-control" v-model="user.email"
              placeholder="不超过64个字符，用于登录网站，sample@mail.com形式"
              pattern="^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$"
              @blur="checkEmail()">
            </div>

            <div class="form-group">
              <label for="password">密码</label>
              <input type="password" class="form-control" v-model="pwd"
              placeholder="6-32个字符" pattern="^.{6,32}$">
            </div>

            <div class="form-group">
              <label for="confirmPwd">确认密码</label>
              <input type="password" class="form-control" v-model="confirmPwd">
            </div>

            <div class="form-group">
              <label for="confirmPwd">手机号码</label>
              <input type="text" class="form-control" v-model="user.phone"
              placeholder="11位手机号" pattern="^[0-9]{11}$"
              @blur="checkPhone()">
            </div>

            <div class="form-group">
              <label for="confirmPwd">配送地址</label>
              <input type="text" class="form-control" v-model="user.address"
              placeholder="不超过128个字符，不能含有特殊字符，不能以下划线开头和结尾"
              pattern="^(?!_)(?!.*?_$)[a-zA-Z0-9_\-</\\>\u4e00-\u9fa5]*$">
            </div>

            <button class="btn btn-block btn-success" type="submit" ref="submit">注册</button>
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
    pwd: '',
    confirmPwd: '',
    user: {
      name: '',
      password: '',
      email: '',
      phone: '',
      address: ''
    },
    timer: null as number|null
  }),
  components: {
    Logo
  },
  methods: {
    register() {
      if(!this.checkAll()){
        return
      }
      this.user.password = getMD5(this.pwd)

      const submit = this.$refs.submit as HTMLButtonElement
      this.temporaryDisableButton(submit,5000)
      this.$store.dispatch("showAlert","正在注册")

      axios.post('/user/register', this.user).then((res:any)=>{
        if(res.data.code===200){
          this.$store.dispatch("showAlert","注册成功")
          this.$router.push({name: 'login'})
        } else {
          this.$store.dispatch("showAlert",`${res.data.code}: ${res.data.msg}`)
          this.enableButtonAndClearTimer(submit)
        }
      }).catch((err:any)=>{
        this.$store.dispatch("showAlert","网络异常")
        this.enableButtonAndClearTimer(submit)
        console.error(err)
      })
    },
    checkEmail() {
      axios.get(`/user/register/emailexist?email=${this.user.email}`)
      .then((res:any)=>{
        if(res.data.code === 402) {
          this.$store.dispatch("showAlert", "邮箱已被注册")
        } else if (res.data.code === 406) {
          this.$store.dispatch("showAlert","服务器异常")
        }
      })
      .catch((err:any)=>{
        this.$store.dispatch("showAlert","网络异常")
        console.error(err)
      })
    },
    checkPhone() {
      axios.get(`/user/register/phoneexist?phone=${this.user.phone}`)
      .then((res:any)=>{
        if(res.data.code === 402) {
          this.$store.dispatch("showAlert", "手机号已被注册")
        } else if (res.data.code === 406) {
          this.$store.dispatch("showAlert","服务器异常")
        }
      })
      .catch((err:any)=>{
        this.$store.dispatch("showAlert","网络异常")
        console.error(err)
      })
    },
    checkLength(str: string, min: number, max: number) {
      return (str && str.length >= min && str.length <= max)
    },
    checkAll(): boolean {
      if(!this.checkLength(this.user.name, 1, 24)) {
        this.$store.dispatch("showAlert", '称呼长度应在1-24字符之间')
        return false
      }
      if(!this.checkLength(this.user.email,3,64)) {
        this.$store.dispatch("showAlert", '邮箱长度应在3-64字符之间')
        return false
      }
      if(!this.checkLength(this.pwd,6,32)) {
        this.$store.dispatch("showAlert", '密码长度应在6-32字符之间')
        return false
      }
      if(!this.checkLength(this.user.phone,11,11)) {
        this.$store.dispatch("showAlert", '手机长度应为11位字符')
        return false
      }
      if(!this.checkLength(this.user.address, 1, 128)) {
        this.$store.dispatch("showAlert", '地址长度应在1-128字符之间')
        return false
      }
      if(this.pwd !== this.confirmPwd) {
        this.$store.dispatch("showAlert", '两次输入的密码不符')
        return false
      }
      return true
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
  }
})
</script>
