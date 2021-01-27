import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  boards: [],
  activeBoard: {},
  activeEdit: '',
  lists: [],
  activeList: '',
  tasks: [],
  comments: [],
  activeTask: '',
  activeComment: ''
})
