const TodoData = (props) => {
    const { Name, Age, Obj, todoList } = props;
    return (
        <div className="todo-data">
            <div> My name is {Name}</div>
            <div> Watching Youtube</div>
            <div>{JSON.stringify(todoList)}</div>
        </div>
    )
}
export default TodoData;