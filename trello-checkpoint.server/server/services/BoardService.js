import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardService {
  async getAll(userInfo) {
    const res = await dbContext.Boards.find(userInfo)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async getOne(id) {
    const res = await dbContext.Boards.findById(id)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async put(id, data) {
    const res = await dbContext.Boards.findByIdAndUpdate(id, data, { new: true })
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async post(data) {
    const res = await dbContext.Boards.create(data)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async delete(id) {
    const lists = await dbContext.Lists.find({ boardId: id })
    console.log('dl' + lists)
    if (lists) {
      lists.forEach(async l => {
        const tasks = await dbContext.Tasks.find({ listId: l._id })
        console.log(tasks)
        if (!tasks) {
          await dbContext.Lists.findOneAndDelete({ _id: l._id })
        }
        tasks.forEach(async t => {
          await dbContext.Comments.deleteMany({ taskId: t._id })
          await dbContext.Tasks.findOneAndDelete({ _id: l._id })
        })
      })
    }
    const res = await dbContext.Boards.findByIdAndDelete(id)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }
}
export const boardService = new BoardService()
