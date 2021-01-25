import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Task = new Schema(
  {
    body: { type: String, required: true },
    listId: { type: String, required: true },
    creator: { type: Object, required: true },
    completed: { type: Boolean }
  }
)
export default Task
