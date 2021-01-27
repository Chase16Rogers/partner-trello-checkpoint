<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="card text-white bg-dark mb-3">
          <div class="card-header list-head d-flex align-items-center justify-content-center">
            <h2>{{ state.active.title }}</h2>
            <h5 class="ml-5 mr-1 mb-0">
              Create new list
            </h5>
            <modal-component :modal-prop="{name: 'list', id:state.active._id}" />
          </div>
        </div>
        <div class="row">
          <list-component v-for="list in state.list"
                          :key="list._id"
                          :list-prop="list"
          />
        </div>
      </div>
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
import ModalComponent from '../components/ModalComponent.vue'
export default {
  components: { ListComponent, ModalComponent },
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
