import './style.css'
const MyComponent = () => {
    // const phuc = 'Nguyen Dang Phuc';
    const phuc = {
        name: 'Nguyen Dang Phuc',
        age: 19
    }
    return (
        <>
            <div> {JSON.stringify(phuc)} 2005</div>
            <div className="child">20/11/2005</div>
        </>
    )
}
export default MyComponent