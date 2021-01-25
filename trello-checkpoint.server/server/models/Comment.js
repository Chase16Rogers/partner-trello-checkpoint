import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Comment = new Schema(
  {
    body: { type: String, required: true },
    taskId: { type: String, required: true },
    creator: { type: Object, required: true }
  }
)
export default Comment
