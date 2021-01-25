import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardService } from '../services/BoardService'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .put('/:id', this.put)
      .post('', this.post)
      .delete('/:id', this.delete)
  }

  async delete(req, res, next) {
    try {
      await boardService.delete(req.params.id)
      res.send('delete')
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const creator = { creatorId: req.userInfo.id }
      const data = await boardService.getAll(creator)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      await boardService.getOne(req.params.id)
    } catch (error) {
      next(error)
    }
  }

  async put(req, res, next) {
    try {
      const data = await boardService.put(req.params.id, req.body)
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
      const val = await boardService.post(data)
      res.send(val)
    } catch (error) {
      next(error)
    }
  }
}
