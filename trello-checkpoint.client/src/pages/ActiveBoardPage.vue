<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h2>{{ state.active.title }}</h2>
      </div>
    </div>
    <div class="row">
      <list-component v-for="list in state.list"
                      :key="list._id"
                      :list-prop="list"
      />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { boardService } from '../services/BoardsService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import ListComponent from '../components/ListComponent.vue'
import { listsService } from '../services/ListsService'
export default {
  components: { ListComponent },
  name: 'ActiveBoardPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      active: computed(() => AppState.activeBoard),
      list: computed(() => AppState.lists)
    })
    onMounted(async() => {
      try {
        await boardService.getOne(route.params.id)
        await listsService.getAll(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return { state }
  }

}
</script>
<style scoped>

</style>
