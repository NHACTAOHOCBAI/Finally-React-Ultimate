import './components/todo/todo.css'
import TodoData from './components/todo/TodoData'
import TodoNew from './components/todo/TodoNew'
import ReactLogo from './assets/react.svg'
import { useState } from 'react'
const App = () => {
  // khoi tao bien state todolist de chua noi dung
  const [todoList, setTodoList] = useState([])
  //
  // ham them todo
  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000),
      name: name
    }
    setTodoList([...todoList, newTodo]);
  }
  //
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew
        addNewTodo={addNewTodo}
      // truyen ham new
      />
      <TodoData
        todoList={todoList}
      // truyen data
      />
      <div>
        <img src={ReactLogo} className='logo' />
      </div>
    </div>
  )
}

export default App
