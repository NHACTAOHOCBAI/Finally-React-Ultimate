const TodoData = (props) => {
    const { Name, Age, Obj } = props;
    return (
        <div className="todo-data">
            <div> My name is {Name}</div>
            <div> Watching Youtube</div>
        </div>
    )
}
export default TodoData;