<template>
  <div class="container">
    <div class="row">
      <div class="col text-light">
        <div class="card bg-dark mt-5">
          <div class="card-body d-flex align-items-center">
            <h2>Create a new Board</h2><modal-component :modal-prop="{name:'board', id:'board'}" />
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <boards-component v-for="board in state.boards" :key="board._id" :board-prop="board" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { logger } from '../utils/Logger'
import { boardService } from '../services/BoardsService'
import { AppState } from '../AppState'
import ModalComponent from '../components/ModalComponent.vue'
export default {
  components: { ModalComponent },
  setup() {
    const state = reactive({
      boards: computed(() => AppState.boards)
    })
    onMounted(async() => {
      try {
        await boardService.getAll()
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
