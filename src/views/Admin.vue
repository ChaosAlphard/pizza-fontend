<template>
  <div class="row">

    <!-- new pizza -->
    <div class="col-sm-12 col-md-8">
      <NewPizza @addPizza="requestPizza()"/>
    </div>

    <!-- edit panel -->
    <div class="col-sm-12 col-md-4">
      <h3 class="text-muted my-5">菜单</h3>
      <table class="table">
        <thead class="thead-default">
          <tr>
            <th>名称</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item of pizzaData" :key="item.id">
            <td>{{item.name}}</td>
            <td>
              <button class="btn btn-sm btn-outline-primary" @click="editPizza(item.id)">编辑</button>
              <button class="btn btn-sm btn-outline-danger" @click="removePizza(item.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- edit pizza -->
    <transition name="scale">
      <div v-if="inEdit" class="edit">
        <UpdatePizza class="edit-win" :id="editID"
        @closeWin="inEdit = false" @updatePizza="requestPizza()"/>
      </div>
    </transition>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NewPizza from '@/components/NewPizza'
import UpdatePizza from '@/components/UpdatePizza'

export default Vue.extend({
  name: 'Admin',
  data: ()=>({
    pizzaData: [] as Array<Pizza>,
    inEdit: false,
    editID: 0
  }),
  components: {
    NewPizza,
    UpdatePizza
  },
  methods: {
    requestPizza() {
      axios.get('/pizza/findall')
      .then((res:any) => {
        if(res.data.code===200) {
          this.pizzaData = res.data.data
        } else {
          this.$store.dispatch("showAlert", `${res.data.code}: ${res.data.msg}`)
        }
      }).catch((err:any)=>{
        console.warn(err)
        this.$store.dispatch("showAlert", '网络异常')
      })
    },
    editPizza(id: number) {
      this.editID = id
      this.inEdit = true
    },
    removePizza(id: number) {
      if(!confirm("确定要删除吗？")) {
        return
      }
      axios.delete(`/pizza/delete`, {params: {id: id}})
      .then((res:any)=>{
        if(res.data.code === 200) {
          this.$store.dispatch("showAlert", "删除成功")
          this.requestPizza()
        } else if(res.data.code == 403) {
          this.$store.dispatch("showAlert", "session过期，刷新页面再试")
        } else {
          this.$store.dispatch("showAlert", `${res.data.code}: ${res.data.msg}`)
        }
      })
      .catch((err:any)=>{
        console.warn(err)
        this.$store.dispatch("showAlert", '网络异常')
      })
    }
  },
  created() {
    this.requestPizza()
  }
})
</script>

<style scoped>
.scale-enter, .scale-leave-active {
  opacity: 0;
}
.scale-enter-active, .scale-leave-active {
  transition: opacity .3s;
}
.scale-enter > .edit-win, .scale-leave-active > .edit-win {
  transform: translateY(-120px);
}
.scale-enter-active > .edit-win, .scale-leave-active > .edit-win {
  transition: transform .3s;
}

.edit {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0; left: 0;
  background-color: #0008;
}
</style>
