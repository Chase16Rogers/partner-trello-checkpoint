<template>
  <!-- Button trigger modal -->
  <i class="fa fa-arrows-alt fa-size pointer my-1 mx-1" data-toggle="modal" data-target="#exampleModal" aria-hidden="true"></i>
  <!-- Modal -->
  <div class="modal fade"
       id="exampleModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-dark" id="exampleModalLabel">
            Select the list you want to move this task to
          </h5>

          <span aria-hidden="true">&times;</span>
        </div>
        <div class="modal-body d-flex justify-content-center">
          <button-component
            v-for="button in state.buttons"
            :key="button._id"
            :task-id="taskId"
            :button-prop="button"
            class=""
            data-dismiss="modal"
            aria-label="Close"
          />
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
