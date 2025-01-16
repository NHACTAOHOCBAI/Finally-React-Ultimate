import './components/todo/todo.css'
import TodoData from './components/todo/TodoData'
import TodoNew from './components/todo/TodoNew'
import ReactLogo from './assets/react.svg'
import { useState } from 'react'
const App = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, name: "Phuc" },
    { id: 2, name: "Duc" }
  ])
  const Name = "Nguyen Dang Phuc";
  const Age = 19;
  const Obj = {
    name: 'a',
    age: 19
  };
  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000),
      name: name
    }
    setTodoList([...todoList, newTodo]);
  }
  const randomIntFromInterval = (min, max) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew
        addNewTodo={addNewTodo}
      />
      <TodoData
        Name={Name}
        Age={Age}
        Obj={Obj}
        todoList={todoList}
      />
      <div>
        <img src={ReactLogo} className='logo' />
      </div>
    </div>
  )
}

export default App
