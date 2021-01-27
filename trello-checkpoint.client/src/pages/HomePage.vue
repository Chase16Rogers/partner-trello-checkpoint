<template>
  <div class="container-fluid d-flex align-items-center justify-content-center">
    <div class="row">
      <div class="col text-center">
        <!-- <div class="card">
          <div class="card-body"> -->
        <div v-if="state.user.isAuthenticated">
          <h1 class="veryBig">
            <b>Welcome</b>
          </h1>
          <h1>
            <b>
              {{ state.user.name }}</b>
          </h1>
        </div>
        <!-- </div>
        </div> -->
        <h1 v-else class="veryBig">
          <b>LOGIN</b>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
.veryBig{
  font-size: 20vw;
  text-shadow: 6px 6px 20px white;
}
</style>
