<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="about col text-center d-flex justify-content-center flex-column">
        <h1 class="display-3 mb-3">
          <b>Welcome to Project Manager</b>
        </h1>
        <h4>This Website is designed to help you manage complex Projects.</h4>
        <h4>Built over one whole week</h4>
        <h4>Designed By Shiwani and Chase in order to pass the Checkpoint</h4>
        <!-- <div class="d-flex flex-row"> -->
        <h4 class="d-flex justify-content-center">
          Click <router-link class="text-color" :to="{name:'BoardsPage'}">
            <h4 class="d-flex mx-2">
              here
            </h4>
          </router-link> to see you Boards or start a new project
        </h4>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>
<style scoped>
.text-color{
  color: rgb(24, 24, 141);
}
</style>
