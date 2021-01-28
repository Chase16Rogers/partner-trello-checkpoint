<template>
  <div class="card text-white bg-primary mb-3 my-3">
    <div class="card card-body px-1 pb-2 text-dark d-flex">
      <div class="container-fluid">
        <div class="row">
          <div class="col-10">
            <h5>{{ commProp.body }}</h5>
          </div>
          <div class="col-2">
            <div class="d-flex">
              <i class="fa fa-pencil pointer"

                 data-toggle="collapse"
                 :data-target="'#c' + commProp._id"
                 aria-expanded="false"
                 aria-controls="collapseExample"
                 @click="toggleEdit(commProp._id)"
              >
              </i>
              <i class="fa fa-trash text-danger pointer" @click="deleteComment" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <small><b>{{ commProp.creator.name }}</b></small>
          </div>
        </div>
      </div>
    </div>
    <div class="collapse p-2" :id="'c' + commProp._id">
      <form @submit.prevent="editComment()">
        <h4>Edit Comment</h4>
        <input type="text"
               class="border-0"
               id="edit"
               name="edit"
               placeholder="Edit comment..."
               v-model="state.edit"
               required
        >
        <button type="submit" data-toggle="collapse" :data-target="'#c' + commProp._id" class="btn btn-success">
          Submit Changes
        </button>
        <button type="button" class="btn btn-danger" data-toggle="collapse" :data-target="'#c' + commProp._id" @click="state.edit = ''">
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
import { computed, reactive } from 'vue'
export default {
  name: 'CommentComponent',
  props: {
    commProp: { type: Object, required: true },
    taskId: { type: String, required: true },
    toggle: computed(() => AppState.activeComment)
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
        console.log(id)
        if (AppState.activeComment) { $(`#c${AppState.activeComment}`).collapse('hide') }
        AppState.activeComment = id
      },
      async editComment() {
        try {
          const data = { body: state.edit }
          await commentsService.edit(props.commProp._id, data)
          state.edit = ''
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
