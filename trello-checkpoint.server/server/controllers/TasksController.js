import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { taskService } from '../services/TaskService'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
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
      await taskService.delete(req.params.id)
      res.send('delete')
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const list = { creatorId: req.userInfo.id }
      const data = await taskService.getAll(list)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  // async getOne(req, res, next) {
  //   try {
  //     await taskService.getOne(req.params.id)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async put(req, res, next) {
    try {
      const data = await taskService.put(req.params.id, req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async post(req, res, next) {
    try {
      const data = req.body
      data.creator = req.userInfo
      data.creatorId = req.userInfo.id
      data.listId = req.params.id
      const val = await taskService.post(data)
      res.send(val)
    } catch (error) {
      next(error)
    }
  }
}
