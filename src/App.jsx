import './components/todo/todo.css'
import TodoData from './components/todo/TodoData'
import TodoNew from './components/todo/TodoNew'
import ReactLogo from './assets/react.svg'
import { useState } from 'react'
import Header from './components/layouts/header'
import Footer from './components/layouts/footer'
import { Outlet } from 'react-router-dom'
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
  const deleteTodo = (id) => {
    const deletedTodo = todoList.filter((value) => {
      return value.id !== id;
    })
    setTodoList(deletedTodo);
  }
  //
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return (
    <>
      <Header />
      <div className="todo-container">
        <div className="todo-title">Todo List</div>
        <TodoNew
          addNewTodo={addNewTodo}
        // truyen ham new
        />
        {todoList.length !== 0 ?
          <TodoData
            todoList={todoList}
            deleteTodo={deleteTodo}
          />
          :
          <div>
            <img src={ReactLogo} className='logo' />
          </div>
        }
      </div>
      <Outlet />
      <Footer />
    </>
  )

}

export default App
