<template>
  <div class="col-md-4 col-sm-6">
    <div class="card text-white bg-dark mb-3">
      <div class="card-header list-head">
        <div class="container-fluid">
          <div class="row">
            <div class="col-6">
              {{ listProp.title }}
            </div>
            <div class="col-6 d-flex justify-content-end">
              <p class="mb-0">
                New Task
              </p>
              <modal-component :modal-prop="{name: 'task', id: listProp._id}" />
              <i class="fa fa-pencil pointer mx-1"
                 data-toggle="collapse"
                 :data-target="'#c' + listProp._id"
                 aria-expanded="false"
                 aria-controls="collapseExample"
                 @click="toggleEdit(listProp._id)"
              >
              </i>
              <i class="fa fa-trash text-danger fa-2x pointer" @click="deleteList" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <div class="collapse" :id="'c' + listProp._id">
          <form @submit.prevent="editList()">
            <h4>Edit List</h4>
            <input class="border-0 text-light"
                   type="text"
                   id="edit"
                   name="edit"
                   placeholder="Edit list here..."
                   v-model="state.edit"
                   required
            >
            <button type="submit"
                    class="btn btn-success"
                    data-toggle="collapse"
                    :data-target="'#c' + listProp._id"
            >
              Submit Changes
            </button>
            <button type="button"
                    class="btn btn-danger"
                    data-toggle="collapse"
                    :data-target="'#c' + listProp._id"
                    @click="state.edit=''"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
      <div class="card-body task-body">
        <p class="card-text">
          <task-component v-for="task in listTask()" :key="task._id" :task-prop="task" />
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import TaskComponent from './TaskComponent.vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { tasksService } from '../services/TasksService'
import { listsService } from '../services/ListsService'
import $ from 'jquery'
import ModalComponent from './ModalComponent.vue'
export default {
  components: { TaskComponent, ModalComponent },
  name: 'ListComponent',
  props: {
    listProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      tasks: computed(() => AppState.tasks),
      edit: ''
    })
    onMounted(async() => {
      try {
        await tasksService.getAll()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      toggleEdit(id) {
        if (id) { $(`#c${AppState.activeList}`).collapse('hide') }
        AppState.activeList = id
      },
      async editList() {
        try {
          const data = { title: state.edit }
          await listsService.editList(props.listProp._id, data)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteList() {
        try {
          await listsService.deleteList(props.listProp._id)
        } catch (error) {
          logger.error(error)
        }
      },
      listTask() {
        const arr = state.tasks.filter(t => t.listId === props.listProp._id)
        return arr
      }
    }
  }
}
</script>
<style scoped>
.pointer:hover{
  cursor: pointer;
}
</style>
