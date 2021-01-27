<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#a' + modalProp.id">
    +
  </button>

  <!-- Modal -->
  <div class="modal fade"
       :id="'a' + modalProp.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-dark" id="exampleModalLabel">
            Create New {{ modalProp.name }}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="create()">
          <div class="modal-body">
            <input name="create" type="text" v-model="state.new" required>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
import { boardService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'
import $ from 'jquery'

export default {
  name: 'ModalComponent',
  props: {
    modalProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      new: ''
    })
    return {
      state,
      async create() {
        try {
          const title = { title: state.new }
          const body = { body: state.new }
          switch (props.modalProp.name) {
            case 'board':
              await boardService.create(title)
              break
            case 'list':
              await listsService.create(props.modalProp.id, title)
              break
            case 'task':
              await tasksService.create(props.modalProp.id, body)
              break
            case 'comment':
              await commentsService.create(props.modalProp.id, body)
          }
          $(`#a${props.modalProp.id}`).modal('hide')
          state.new = ''
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>
<style scoped>

</style>
