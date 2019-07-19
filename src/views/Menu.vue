<template>
  <div class="row">
    <!-- 菜单 -->
    <div class="col-sm-12 col-md-8" ref="viewbox">
      <div class="search">
        <input type="text" class="form-control"
        placeholder="搜索" ref="search" v-model="query">
        <!-- <button class="btn btn-info">搜索</button> -->
      </div>

      <table class="table">

        <thead>
          <tr class="thead-default">
            <th scope="col">图片</th>
            <th scope="col">尺寸</th>
            <th scope="col">价格</th>
            <th scope="col">加入</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="item of pizzaData">
            <tr :key="item.id">
              <td rowspan="3" class="table-img">
                <img :src="item.picturePreLink" :alt="item.name" ref="image"
                data-preview :data-img-big="item.pictureLink"
                >
              </td>
              <td colspan="3" class="table-title">{{item.name}}</td>
            </tr>

            <tr :key="item.name">
              <td>大</td>
              <td>¥{{item.priceBig}}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary"
                @click="addToBasket(item, item.priceBig, '大')">+</button>
              </td>
            </tr>

            <tr :key="item.picturePreLink">
              <td>小</td>
              <td>¥{{item.priceSmall}}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary"
                @click="addToBasket(item, item.priceSmall, '小')">+</button>
              </td>
            </tr>
          </template>
        </tbody>

      </table>
      <div class="loading" ref="load" v-show="isLoading">正在加载</div>
    </div>
    <!-- 购物车 -->
    <div class="col-sm-12 col-md-4">
      <transition name="fade" mode="out-in">
        <!-- v-if/v-else组合使用时, 如果不绑定key 作区分, 则transition不会生效 -->
        <div class="sticky-basket" v-if="basket.length>0" key="showBasket">
          <table class="table basket-table">

            <thead class="thead-default">
              <tr>
                <th scope="col" class="item-left">名称</th>
                <th scope="col">数量</th>
                <th scope="col">尺寸</th>
                <th scope="col">价格</th>
              </tr>
            </thead>

            <tbody is="transition-group" name="basket-list">
              <!-- 同物品不同尺寸id会重复, 使用id+尺寸做key -->
              <tr v-for="item of basket" :key="item.id+item.size">
                <td class="item-left">{{item.name}}</td>
                <td>
                  <span class="btn btn-sm" @click="subAmount(item)">-</span>
                  <span>{{item.amount}}</span>
                  <span class="btn btn-sm" @click="addAmount(item)">+</span>
                </td>
                <td>{{item.size}}</td>
                <td>¥{{item.price*item.amount}}</td>
              </tr>
            </tbody>

          </table>

          <p>总价: ¥{{total}}</p>
          <button class="btn btn-info btn-block" @click="submit()">提交</button>
        </div>

        <div class="card border-info" v-else key="showTip">
          <p class="card-header">购物车中没有任何商品</p>
        </div>

      </transition>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import zoomPicture from '@/plugins/showPicOrigin'
import dat from '@/plugins/debAndThr'

export default Vue.extend({
  data:()=>({
    // pizzaData: [] as Array<Pizza>,
    basket: [] as Array<BasketItem>,
    isLoading: false,
    noPrompt: false
  }),
  computed: {
    pizzaData: {
      // 从Vuex中获取数据
      get(): Array<Pizza> {
        // 直接获取数据
        // return this.$store.state.pizzaData
        // 通过getters 获取数据
        return this.$store.getters.getPizzaData
      },
      set() {}
    },
    page: {
      get(): number {
        return this.$store.getters.getCurrentPage
      },
      set() {}
    },
    query: {
      get(): string {
        return this.$store.getters.getQueryParam
      },
      set(str: string): void {
        this.$store.dispatch("setQuery", str)
      }
    },
    hasMore(): boolean {
      return this.$store.getters.hasMorePizza
    },
    total(): number {
      let totalCost = 0

      for(const item of this.basket) {
        totalCost += item.amount * item.price
      }

      return totalCost
    },
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    requestPizzaData(queryStr: string = ''): void {
      // -> /pizza/find?page=${this.page}
      const url = this.getUrl(this.query, this.page)
      axios.get(`/pizza/${url}`)
      .then((res:any)=>{
        if(res.data.code===200){
          // 重置提示状态
          this.noPrompt = false
          // 重置Pizza数据
          this.$store.commit("setPizzaData", res.data.data)
          // 等待NextTick, Dom渲染完成再获取refs
          this.$nextTick(()=>{
            this.watchPic(this.$refs.image as Element[])
          })
        } else {
          console.log(res.data)
          this.$store.dispatch("showAlert",`${res.data.code}: ${res.data.msg}`)
        }
      }).catch((err:any)=>{
        console.warn(err)
        this.$store.dispatch("showAlert", "网络异常")
      })
    },
    reqMorePizza(): void {
      const url = this.getUrl(this.query, this.page+1)
      axios.get(`/pizza/${url}`)
      .then((res:any)=>{
        if(res.data.code===200){
          setTimeout(() => {
            this.isLoading = false
          }, 1000);
          this.$store.commit("pushPizzaData", res.data.data)
          this.$nextTick(()=>{
            this.watchPic(this.$refs.image as Element[])
          })
        } else {
          console.log(res.data)
          this.$store.dispatch("showAlert",`${res.data.code}: ${res.data.msg}`)
        }
      }).catch((err:any)=>{
        console.warn(err)
        this.$store.dispatch("showAlert", "网络异常")
      })
    },
    searchPizza() {
      this.$store.commit("setPage", 0)
      this.requestPizzaData(this.query)
    },
    getUrl(query: string, page: number): string {
      if(this.$store.getters.hasQueryParam) {
        return `findbyname?query=${query}&page=${page}`
      } else {
        return `find?page=${page}`
      }
    },
    watchScroll() {
      // 不再反复提示
      if(this.noPrompt) { return }
      if(!this.$store.getters.hasMorePizza) {
        // 设置已经到底并不再提示
        this.noPrompt = true
        // 提示一次
        this.$store.dispatch("showAlert", "没有更多了")
        return
      }

      const load = this.$refs.load as HTMLDivElement
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

      if(scrollTop + height + 20 >= load.offsetTop && !this.isLoading) {
        this.isLoading = true
        this.$store.dispatch("showAlert", "正在加载")
        this.reqMorePizza()
      }
    },
    addToBasket(item:Pizza, price:number, size:string): void {
      const toBeAdd: BasketItem = {
        id: item.id,
        name: item.name,
        amount: 1,
        size: size,
        price: price
      }
      if(this.basket.length > 0){
        const res = this.basket.filter(bask=>(bask.id === item.id&&bask.size===size))
        if(res&&res.length!==0) {
          res[0].amount++
        } else {
          this.basket.push(toBeAdd)
        }
      } else {
        this.basket.push(toBeAdd)
      }
    },
    submit(){
      if(this.isLogin){
        this.basket = []
        this.$store.dispatch("showAlert", "付款功能尚未完善")
      } else {
        this.$store.dispatch("showAlert", "请先登录")
        this.$router.push({name: 'login'})
      }
    },
    addAmount(item:BasketItem): void {
      item.amount++
    },
    subAmount(item:BasketItem): void {
      item.amount--
      if(item.amount <= 0) {
        this.removeFromBasket(item)
      }
    },
    removeFromBasket(item:BasketItem): void {
      this.basket.splice(this.basket.indexOf(item),1)
    },
    watchPic(imgs:Element|Element[]) {
      (zoomPicture as ZoomPlugin)
      .init()
      .watch(imgs)
      .watchError(imgs)
    },
    unwatchPic(imgs:Element|Element[]) {
      (zoomPicture as ZoomPlugin)
      .unwatch(imgs)
      .unwatchError(imgs)
      .discard()
    }
  },
  created() {
    if(!this.$store.getters.hasPizzaData) {
      this.requestPizzaData()
    }
  },
  mounted() {
    if(this.$store.getters.hasPizzaData) {
      this.watchPic(this.$refs.image as Element[])
    }
    (this.$refs.search as HTMLInputElement).onkeyup = dat.debounce(this.searchPizza, 800);
    // (this.$refs.viewbox as HTMLDivElement)
    document.body.onscroll = dat.throttle(this.watchScroll, 500)
  },
  beforeRouteLeave(to, from, next) {
    try {
      // 注销事件监听
      (this.$refs.search as HTMLInputElement).onkeyup = null
      document.body.onscroll = null
      this.unwatchPic(this.$refs.image as Element[])
    } finally {
      next()
    }
  }
})
</script>

<style scoped>
.search {
  margin-top: 8px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sticky-basket {
  position: sticky;
  top: 0;
}

.table-img {
  width: 10vw;
  height: 10vw;
  min-width: 64px;
}
.table-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  min-width: 128px;
  min-height: 128px;
  cursor: pointer;
}
.table-title {
  font-size: 24px;
  line-height: 1;
}
.loading {
  text-align:center;
}
.loading::before{
  content:'';
  width: 20px;
  height: 20px;
  border-radius: 100% 100% 100% 0;
  border: 1px solid #17A2B8;
  display: inline-block;
  border-bottom: none;
  border-left: none;
  box-sizing: border-box;
  vertical-align: sub;
  animation: loading 1s linear infinite;
}
@keyframes loading{
  0%{
      transform:rotate(0deg)
  }
  100%{
      transform:rotate(360deg)
  }
}

.basket-table th, .basket-table td {
  text-align: center;
}
.basket-table .item-left {
  text-align: left;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
  transform: translateX(128px);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s, transform .2s;
}
.basket-list-enter, .basket-list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.basket-list-enter-active, .basket-list-leave-active {
  transition: opacity .2s, transform .2s;
}
</style>
