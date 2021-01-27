import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ListsService {
  async getAll(id) {
    const res = await api.get('api/lists/' + id)
    AppState.lists = res.data
    // AppState.lists = AppState.lists.filter(l => l.boardId === id)
    logger.log(res.data)
  }

  async create(id, data) {
    const res = await api.post('api/lists/' + id, data)
    AppState.lists.push(res.data)
  }

  async editList(id, data) {
    const res = await api.put('api/lists/' + id, data)
    const index = AppState.lists.findIndex(l => l._id === id)
    AppState.lists.splice(index, 1, res.data)
  }

  async deleteList(id) {
    await api.delete('api/lists/' + id)
    const index = AppState.lists.findIndex(l => l._id === id)
    AppState.lists.splice(index, 1)
  }
}
export const listsService = new ListsService()
