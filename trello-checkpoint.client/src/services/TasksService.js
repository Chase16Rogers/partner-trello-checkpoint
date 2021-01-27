import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  async getAll() {
    const res = await api.get('api/tasks')
    AppState.tasks = res.data
  }

  async create(id, data) {
    const res = await api.post('api/tasks/' + id, data)
    AppState.tasks.push(res.data)
  }

  async editTask(id, data) {
    const res = await api.put('api/tasks/' + id, data)
    const index = AppState.tasks.findIndex(t => t._id === id)
    AppState.tasks.splice(index, 1, res.data)
  }

  async deleteTask(id) {
    await api.delete('api/tasks/' + id)
    const index = AppState.tasks.findIndex(t => t._id === id)
    AppState.tasks.splice(index, 1)
  }
}
export const tasksService = new TasksService()
