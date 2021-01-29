import { AppState } from '../AppState'
import { api } from './AxiosService'
import $ from 'jquery'

class CommentsService {
  async getAll(id) {
    const res = await api.get('api/comments/' + id)
    // console.log(res.data)
    AppState.comments = res.data
  }

  async create(id, data) {
    const res = await api.post('api/comments/' + id, data)
    AppState.comments.push(res.data)
  }

  async delete(id) {
    const comm = AppState.comments.findIndex(c => c._id === id)
    AppState.comments.splice(comm, 1)
    await api.delete('api/comments/' + id)
  }

  async edit(id, data) {
    // console.log('it got here')
    const res = await api.put('api/comments/' + id, data)
    const comm = AppState.comments.findIndex(c => c._id === id)
    AppState.comments.splice(comm, 1, res.data)
    $(`#c${id}`).collapse('hide')
  }
}
export const commentsService = new CommentsService()
