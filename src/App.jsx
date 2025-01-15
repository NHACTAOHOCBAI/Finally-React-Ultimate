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
    alert(`call me by ${name}`);
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
