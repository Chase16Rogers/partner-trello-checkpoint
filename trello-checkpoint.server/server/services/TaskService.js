import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TaskService {
  async getAll(userInfo) {
    const res = await dbContext.Tasks.find(userInfo)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async getOne(id) {
    const res = await dbContext.Tasks.findById(id)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async put(id, data) {
    const res = await dbContext.Tasks.findByIdAndUpdate(id, data, { new: true })
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async post(data) {
    const res = await dbContext.Tasks.create(data)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async delete(id) {
    const res = await dbContext.Tasks.findByIdAndDelete(id)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }
}
export const taskService = new TaskService()
