import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentService {
  async getAll(userInfo = {}) {
    const res = await dbContext.Comments.find(userInfo)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async getOne(id) {
    const res = await dbContext.Comments.findById(id)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async put(id, data) {
    const res = await dbContext.Comments.findByIdAndUpdate(id, data, { new: true })
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async post(data) {
    const res = await dbContext.Comments.create(data)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async delete(id) {
    const res = await dbContext.Comments.findByIdAndDelete(id)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }
}
export const commentService = new CommentService()
