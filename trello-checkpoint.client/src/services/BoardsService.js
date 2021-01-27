// import { logger } from '../utils/Logger'

// const { AppState } = require('../AppState')
// const { api } = require('./AxiosService')
import { api } from '../services/AxiosService'
import { AppState } from '../AppState'
class BoardsService {
  async getAll() {
    const res = await api.get('api/boards')
    AppState.boards = res.data
    console.log(res.data)
  }

  async getOne(id) {
    const res = await api.get('api/boards/' + id)
    AppState.activeBoard = res.data
  }

  async create(data) {
    const res = await api.post('api/boards', data)
    AppState.boards.push(res.data)
  }

  async editBoard(id, data) {
    const res = await api.put('api/boards/' + id, data)
    const index = AppState.boards.findIndex(b => b._id === id)
    AppState.boards.splice(index, 1, res.data)
  }

  async deleteBoard(id) {
    await api.delete('api/boards/' + id)
    const index = AppState.boards.findIndex(b => b._id === id)
    AppState.boards.splice(index, 1)
  }
}
export const boardService = new BoardsService()
