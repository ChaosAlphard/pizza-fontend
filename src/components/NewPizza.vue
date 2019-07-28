<template>
  <div>
    <h3 class="text-muted my-5">🍕添加新Pizza🍕</h3>

    <div class="form-group">
      <div>*名称</div>
      <input type="text" class="form-control" v-model="pizza.name"
      placeholder="不超过28个字符" pattern="^.{1,28}$">
    </div>

    <div class="form-group">
      <div>*大图连接</div>
      <input type="text" class="form-control" v-model="pizza.pictureLink"
      placeholder="不超过1024个字符" pattern="^.{1,1024}$">
    </div>

    <div class="form-group">
      <div>*缩略图连接</div>
      <input type="text" class="form-control" v-model="pizza.picturePreLink"
      placeholder="不超过1024个字符" pattern="^.{1,1024}$">
    </div>

    <div class="form-group">
      <div>图片预览(右-缩略)</div>
      <div class="form-control img-pre">
        <img :src="pizza.pictureLink">
        <img :src="pizza.picturePreLink">
      </div>
    </div>

    <div class="form-group">
      <div>*价格(小份)</div>
      <input type="text" class="form-control" v-model="pizza.priceSmall"
      placeholder="整数" pattern="^[1-9]\d*$">
    </div>

    <div class="form-group">
      <div>*价格(大份)</div>
      <input type="text" class="form-control" v-model="pizza.priceBig"
      placeholder="整数" pattern="^[1-9]\d*$">
    </div>

    <div class="form-group">
      <div>description</div>
      <textarea rows="3" class="form-control" v-model="pizza.description"
      placeholder="不超过420个字符"></textarea>
    </div>

    <div class="row from-group">
      <button class="btn btn-info btn-block"
      @click="addPizza()" ref="submit">添加</button>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: ()=>({
    pizza: {
      name: '',
      pictureLink: '',
      picturePreLink: '',
      priceSmall: '',
      priceBig: '',
      description: null as string|null
    } as ToBeAddPizza,
    timer: null as null|number
  }),
  methods: {
    addPizza() {
      try {
        if(Number(this.pizza.priceSmall) >= Number(this.pizza.priceBig)) {
          this.$store.dispatch("showAlert", '大份的价格应大于小份的价格')
          return
        }
      } catch(e) {
        this.$store.dispatch("showAlert", '格式错误')
        return
      }
      if(this.pizza.priceBig > 2147483647) {
        this.$store.dispatch("showAlert", '数额过大')
        return
      }
      const submit = this.$refs.submit as HTMLButtonElement
      this.temporaryDisableButton(submit, 3000)

      axios.put('/pizza/new', this.pizza)
      .then((res:any) => {
        if(res.data.code === 200) {
          this.$store.dispatch("showAlert", "添加成功")
          // 清空Pizza数据
          this.cleanData()
          // 通知父组件
          this.$emit("addPizza")
        } else if(res.data.code == 403) {
          this.$store.dispatch("showAlert", "session过期，刷新页面再试")
        } else if(res.data.detail) {
          const detail = res.data.detail
          this.$store.dispatch("showAlert", `不满足条件: ${this.showAlert(detail)}`)
          this.enableButtonAndClearTimer(submit)
        } else {
          this.$store.dispatch("showAlert", `${res.data.code}: ${res.data.msg}`)
        }
      }).catch((err:any)=>{
        console.warn(err)
        this.$store.dispatch("showAlert", '网络异常')
      })
    },
    cleanData() {
      this.pizza.name=this.pizza.priceSmall=this.pizza.priceBig = ''
      this.pizza.pictureLink=this.pizza.picturePreLink = ''
      this.pizza.description = null
    },
    showAlert(detail: any) {
      let obj = "";
      detail.name&&(obj+=`-名称: ${detail.name}-`);
      detail.picturePreLink&&(obj+=`-缩略图连接: ${detail.picturePreLink}-`);
      detail.pictureLink&&(obj+=`-大图连接: ${detail.pictureLink}-`);
      detail.priceSmall&&(obj+=`-价格(小份): ${detail.priceSmall}-`);
      detail.priceBig&&(obj+=`-价格(大份): ${detail.priceBig}-`);
      detail.description&&(obj+=`-description: ${detail.description}-`);
      return obj
    },
    temporaryDisableButton(submit: HTMLButtonElement, time: number = 3000): number {
      submit.disabled = true
      return setTimeout(() => {
        submit.disabled = false
      }, time);
    },
    enableButtonAndClearTimer(submit: HTMLButtonElement) {
      clearTimeout(this.timer as number)
      this.timer = null
      submit.disabled = false
    }
  }
})
</script>

<style scoped>
.img-pre {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  min-height: 38px;
}
.img-pre img {
  width: 100%;
  height: 100%;
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
}
</style>
