import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ListsService {
  async getAll(id) {
    const res = await api.get('api/lists/')
    AppState.lists = res.data
    AppState.lists = AppState.lists.filter(l => l.boardId === id)
    logger.log(res.data)
  }
}
export const listsService = new ListsService()
