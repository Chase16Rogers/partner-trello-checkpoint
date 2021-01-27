<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    Launch demo modal
  </button>

  <!-- Modal -->
  <div class="modal fade"
       id="exampleModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Modal title
          </h5>
          <button-component
            v-for="button in state.buttons"
            :key="button._id"
            :task-id="taskId"
            :button-prop="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          />
          <span aria-hidden="true">&times;</span>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import { logger } from '../utils/Logger'

export default {
  name: 'ChangeModal',
  props: {
    taskId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      buttons: computed(() => AppState.lists)
    })
    return {
      state,
      async changeList(id) {
        try {
          const data = { listId: id }
          await tasksService.editTask(props.taskId, data)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }

}
</script>

<style>

</style>
