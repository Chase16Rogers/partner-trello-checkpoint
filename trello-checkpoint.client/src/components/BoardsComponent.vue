<template>
  <div class="col-12 my-2">
    <div class="card bg-dark">
      <div class="card-body container-fluid">
        <div class="row">
          <div class="col-9">
            <router-link class="text-light" :to="{name: 'Active', params:{id: boardProp._id}}">
              <h2>{{ boardProp.title }}</h2>
            </router-link>
          </div>

          <div class="col-3 d-flex align-items-center justify-content-end">
            <i class="fa fa-pencil text-light fa-2x mr-2"
               data-toggle="collapse"
               :data-target="'#c' + boardProp._id"
               aria-expanded="false"
               aria-controls="collapseExample"
               @click="toggleEdit(boardProp._id)"
               aria-hidden="true"
            ></i>

            <i class="fa fa-trash text-danger fa-2x pointer" @click="deleteBoard" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div class="collapse " :id="'c' + boardProp._id">
        <div class="d-flex justify-content-center mb-2">
          <form @submit.prevent="editBoard()">
            <h4>Edit Board</h4>
            <input type="text" id="edit" name="edit" required v-model="state.edit">
            <button type="submit" class="btn btn-success mx-3">
              Submit Changes
            </button>
            <button type="button" class="btn btn-danger" @click="state.edit=''">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { logger } from '../utils/Logger'
import { boardService } from '../services/BoardsService'
import { AppState } from '../AppState'
import $ from 'jquery'
export default {
  name: 'BoardsComponent',
  props: {
    boardProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      edit: ''
    })
    return {
      state,
      toggleEdit(id) {
        if (id) { $(`#c${AppState.activeEdit}`).collapse('hide') }
        AppState.activeEdit = id
      },
      async editBoard() {
        try {
          const data = { title: state.edit }
          await boardService.editBoard(props.boardProp._id, data)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteBoard() {
        try {
          await boardService.deleteBoard(props.boardProp._id)
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
