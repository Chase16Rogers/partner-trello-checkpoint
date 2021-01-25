import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Board = new Schema(
  {
    title: { type: String, required: true },
    creator: { type: Object },
    creatorId: { type: String, required: true }
  })

export default Board
