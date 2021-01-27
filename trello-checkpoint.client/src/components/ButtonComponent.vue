<template>
  <button class="btn btn-outline-warning mx-1" @click="changeList(buttonProp._id)">
    {{ buttonProp.title }}
  </button>
</template>

<script>
import { reactive } from 'vue'
import { tasksService } from '../services/TasksService'
import { logger } from '../utils/Logger'
export default {
  name: 'ButtonComponent',
  props: {
    buttonProp: {
      type: Object,
      required: true
    },
    taskId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const state = reactive({

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
