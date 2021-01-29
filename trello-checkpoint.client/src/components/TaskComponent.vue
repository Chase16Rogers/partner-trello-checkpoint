<template>
  <div class="card text-white taskColor mb-3">
    <div class="card-header list-head my-1 px-0 d-flex justify-content-center">
      <div class="container-fluid">
        <div class="row">
          <div class="col-9 d-flex justify-content-center align-content-center">
            <h4>{{ taskProp.body }}</h4>
          </div>
          <div class="col-3">
            <i class="fa fa-comment pointer my-1 mx-1 fa-size"
               data-toggle="collapse"
               :data-target="'#t' + taskProp._id"
               aria-expanded="false"
               aria-controls="collapseExample"
               @click="getComments(taskProp._id)"
            >
            </i>

            <change-modal :task-id="taskProp._id" />
            <i class="fa fa-pencil fa-size pointer my-1 mx-1"
               data-toggle="collapse"
               :data-target="'#c' + taskProp._id"
               aria-expanded="false"
               aria-controls="collapseExample"
               @click="toggleEdit(taskProp._id)"
            >
            </i>
            <i class="fa fa-trash text-danger fa-size pointer  mx-1" @click="deleteTask" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="collapse task-body p-2" :id="'c' + taskProp._id">
      <form @submit.prevent="editTask()">
        <h4>Edit Task</h4>
        <input type="text"
               class="border-0 nice-input mb-1 text-light"
               placeholder="Edit task here..."
               id="edit"
               name="edit"
               v-model="state.edit"
               required
        >
        <button type="submit" class="btn btn-success">
          Submit Changes
        </button>
        <button type="button" class="btn btn-danger" @click="commentCancel()">
          Cancel
        </button>
      </form>
    </div>

    <div class="collapse" :id="'t' + taskProp._id">
      <div class="card card-body text-dark">
        <div class="d-flex">
          <h5>Create new comment</h5>
          <modal-component :modal-prop="{name: 'comment', id: taskProp._id}" />
        </div>

        <!-- <i class="fa fa-trash text-danger" @click="deleteComment" aria-hidden="true"></i> -->
        <comment-component v-for="comm in state.comments" :key="comm._id" :comm-prop="comm" />
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

export default
{
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
          // console.log('ID' + AppState.activeTask)
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
          $(`#c${AppState.activeTask}`).collapse('hide')
          state.edit = ''
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
      },
      commentCancel() {
        state.edit = ''
        $(`#c${props.taskProp._id}`).collapse('hide')
      }
    }
  }
}
</script>

<style>

</style>
