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
}
export const boardService = new BoardsService()
