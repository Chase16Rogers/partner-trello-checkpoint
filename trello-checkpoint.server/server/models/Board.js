import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Board = new Schema(
  {
    title: { type: String, required: true },
    creator: { type: Object }
  })

export default Board
