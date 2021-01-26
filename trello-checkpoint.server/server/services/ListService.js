import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListService {
  async getAll() {
    const res = await dbContext.Lists.find()
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async getOne(id) {
    const res = await dbContext.Lists.findById(id)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async put(id, data) {
    const res = await dbContext.Lists.findByIdAndUpdate(id, data, { new: true })
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async post(data) {
    const res = await dbContext.Lists.create(data)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async delete(id) {
    const res = await dbContext.Lists.findByIdAndDelete(id)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }
}
export const listService = new ListService()
