import { useState } from "react";

const TodoData = (props) => {
    const { todoList, deleteTodo } = props;
    const handleClick = (id) => {
        deleteTodo(id);
    }
    return (
        <div className="todo-data">
            {todoList.map((value) => {
                return (
                    <div className="todo-item" key={value.id}>
                        <div>{value.name}</div>
                        <button onClick={() => {
                            handleClick(value.id)
                        }}>delete</button>
                    </div>
                )
            })}
        </div>
    )
}
export default TodoData;