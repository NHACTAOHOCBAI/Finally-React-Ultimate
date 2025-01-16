const TodoData = (props) => {
    const { todoList } = props;
    return (
        <div className="todo-data">
            {todoList.map((value, index) => {
                return (
                    <div className="todo-item">
                        <div>{value.name}</div>
                        <button>delete</button>
                    </div>
                )
            })}
        </div>
    )
}
export default TodoData;