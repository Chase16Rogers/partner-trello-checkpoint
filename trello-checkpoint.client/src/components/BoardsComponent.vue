<template>
  <div class="col-6">
    <router-link :to="{name: 'Active', params:{id: boardProp._id}}">
      <div class="card">
        <div class="card-body">
          <h2>{{ boardProp.title }}</h2>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'BoardsComponent',
  props: {
    boardProp: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>

</style>
