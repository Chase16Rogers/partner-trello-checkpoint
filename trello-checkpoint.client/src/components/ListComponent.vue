<template>
  <div class="col-4">
    <div class="card text-white bg-dark mb-3">
      <div class="card-header">
        <modal-component :modal-prop="{name: 'task', id: listProp._id}" />
        {{ listProp.title }}
        <button class="btn btn-primary"
                type="button"
                data-toggle="collapse"
                :data-target="'#c' + listProp._id"
                aria-expanded="false"
                aria-controls="collapseExample"
                @click="toggleEdit(listProp._id)"
        >
          Edit List
        </button>
        <div class="collapse" :id="'c' + listProp._id">
          <form @submit.prevent="editList()">
            <h4>Edit List</h4>
            <input type="text" id="edit" name="edit" v-model="state.edit">
            <button type="submit" class="btn btn-success">
              Submit Changes
            </button>
            <button type="button" class="btn btn-danger" @click="state.edit=''">
              Cancel
            </button>
          </form>
        </div>
        <i class="fa fa-trash text-danger fa-2x pointer" @click="deleteList" aria-hidden="true"></i>
      </div>
      <div class="card-body">
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
