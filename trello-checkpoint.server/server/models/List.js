import mongoose from 'mongoose'
const Schema = mongoose.Schema

const List = new Schema(
  {
    title: { type: String, required: true },
    boardId: { type: String, required: true },
    creator: { type: Object, required: true }
  }
)

export default List
