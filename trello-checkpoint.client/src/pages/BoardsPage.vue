<template>
  <div class="container-fluid">
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
export default {
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
