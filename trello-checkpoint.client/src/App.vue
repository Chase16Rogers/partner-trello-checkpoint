<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view v-slot="{Component}">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
// .background{
//   background-image: url('https://coolbackgrounds.io/images/unsplash/samuel-zeller-medium-b832fe04.jpg');
//   background-attachment: fixed;
// }
.list-head{
  background-color: rgb(107, 107, 107);
}
.task-body{
  background-color: rgb(148,148,148);
}
.comment-color{
  background-color: rgb(230,230,230);
}

input.border-0{
  border-bottom: 1px solid !important;
  background-color: #f7f7f900;
  color: rgb(243, 243, 243);
}
::placeholder{
  color:rgb(243, 243, 243);
}
i{
  font-size: 1.5em  !important;
}
body{
  background: rgb(4,4,4);
background: linear-gradient(90deg, rgba(4,4,4,1) 9%, rgba(225,225,232,1) 51%, rgba(13,14,14,1) 90%);
font-family: 'Architects Daughter', cursive;
}
div.card{
 box-shadow: 4px 4px 10px 8px rgb(44, 54, 85);
}
</style>
