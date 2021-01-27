<template>
  <div class="card text-white bg-primary mb-3">
    <div class="card card-body text-dark d-flex">
      <i class="fa fa-trash text-danger pointer" @click="deleteComment" aria-hidden="true"></i>
      <button class="btn btn-primary"
              type="button"
              data-toggle="collapse"
              :data-target="'#c' + commProp._id"
              aria-expanded="false"
              aria-controls="collapseExample"
              @click="toggleEdit(commProp._id)"
      >
        Edit
      </button>
      <h2>{{ commProp.creator.name }}</h2>
      <h2>{{ commProp.body }}</h2>
    </div>
    <div class="collapse" :id="'c' + commProp._id">
      <form @submit.prevent="editComment()">
        <h4>Edit Comment</h4>
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
</template>

<script>
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { reactive } from 'vue'
export default {
  name: 'CommentComponent',
  props: {
    commProp: { type: Object, required: true },
    taskId: { type: String, required: true }
  },
  setup(props) {
    const state = reactive({
      edit: ''
    })
    return {
      state,
      async deleteComment() {
        try {
          await commentsService.delete(props.commProp._id)
        } catch (error) {
          logger.error(error)
        }
      },
      toggleEdit(id) {
        if (id) { $(`#c${AppState.activeComment}`).collapse('hide') }
        AppState.activeComment = id
      },
      async editComment() {
        try {
          const data = { body: state.edit }
          await commentsService.edit(props.commProp._id, data)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style>
.pointer:hover {
  cursor: pointer;
}
</style>
