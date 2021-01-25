import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentService } from '../services/CommentService'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      // .get('/:id', this.getOne)
      .put('/:id', this.put)
      .post('/:id', this.post)
      .delete('/:id', this.delete)
  }

  async delete(req, res, next) {
    try {
      await commentService.delete(req.params.id)
      res.send('delete')
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await commentService.getAll()
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  // async getOne(req, res, next) {
  //   try {
  //     await commentService.getOne(req.params.id)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async put(req, res, next) {
    try {
      const data = await commentService.put(req.params.id, req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async post(req, res, next) {
    try {
      const data = req.body
      data.creator = req.userInfo
      data.taskId = req.params.id
      const val = await commentService.post(data)
      res.send(val)
    } catch (error) {
      next(error)
    }
  }
}
