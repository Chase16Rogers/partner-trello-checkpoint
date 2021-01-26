<template>
  <div class="col-3">
    <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
      <div class="card-header">
        {{ listProp }}
      </div>
      <div class="card-body">
        <h5 class="card-title">
          Info card title
        </h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListComponent',
  props: {
    listProp: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>

</style>
