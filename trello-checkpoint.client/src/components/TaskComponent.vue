<template>
  <div class="card text-white taskColor mb-3">
    <div class="card-header d-flex">
      <h2>{{ taskProp.body }}</h2>
      <i class="fa fa-bars" aria-hidden="true" data-toggle="modal" :data-target="'#l' +taskProp._id"></i>

      <div class="collapse" :id="'c' + taskProp._id">
        <form @submit.prevent="editTask()">
          <h4>Edit Task</h4>
          <input type="text" id="edit" name="edit" v-model="state.edit">
          <button type="submit" class="btn btn-success">
            Submit Changes
          </button>
          <button type="button" class="btn btn-danger" @click="state.edit=''">
            Cancel
          </button>
        </form>
      </div>
    </div>
    <div class="collapse" :id="'t' + taskProp._id">
      <div class="card card-body text-dark">
        <!-- <i class="fa fa-trash text-danger" @click="deleteComment" aria-hidden="true"></i> -->
        <comment-component v-for="comm in state.comments" :key="comm._id" :comm-prop="comm" :task-id="taskProp._id" />
      </div>
    </div>
  </div>
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div class="modal fade"
       :id="'l'+ taskProp._id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Task Options
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <modal-component :modal-prop="{name: 'comment', id: taskProp._id}" />
          <button class="btn btn-primary"
                  type="button"
                  data-toggle="collapse"
                  :data-target="'#t' + taskProp._id"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  @click="getComments(taskProp._id)"
          >
            View
          </button>
          <button class="btn btn-primary"
                  type="button"
                  data-toggle="collapse"
                  :data-target="'#c' + taskProp._id"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  @click="toggleEdit(commProp._id)"
          >
            Edit Task
          </button>
          <change-modal :task-id="taskProp._id" />
          <i class="fa fa-trash text-danger fa-2x pointer" @click="deleteTask" aria-hidden="true"></i>
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
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { tasksService } from '../services/TasksService'
import ChangeModal from './ChangeModal.vue'

export default
{
  components: { ChangeModal },
  name: 'TaskComponent',
  props: {
    taskProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      comments: computed(() => AppState.comments),
      edit: ''
    })
    return {
      state,
      async getComments(id) {
        try {
          AppState.comments = []
          console.log('ID' + AppState.activeTask)
          if (id) { $(`#t${AppState.activeTask}`).collapse('hide') }
          await commentsService.getAll(id)
          AppState.activeTask = id
        } catch (error) {
          logger.error(error)
        }
      },
      toggleEdit(id) {
        if (id) { $(`#c${AppState.activeTask}`).collapse('hide') }
        AppState.activeTask = id
      },
      async editTask() {
        try {
          const data = { body: state.edit }
          await tasksService.editTask(props.taskProp._id, data)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteTask() {
        try {
          await tasksService.deleteTask(props.taskProp._id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style>
.taskColor{
  background-color: ;
}

</style>
