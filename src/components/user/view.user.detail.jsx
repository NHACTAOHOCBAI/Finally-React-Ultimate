import { Drawer } from "antd"

const ViewDetail = (props) => {
    const { setDataView, dataView, open, setOpen } = props
    return (
        <Drawer title="Basic Drawer"
            open={open}
            onClose={() => {
                setDataView(null);
                setOpen(false)
            }}>
            {dataView ?
                <>
                    <p>{`ID :${dataView.id}`}</p>
                    <p>{`Title :${dataView.title}`}</p>
                    <p>{`Body :${dataView.body}`}</p>
                </>
                :
                <>
                    <p> have no data</p>
                </>}
        </Drawer>
    )
}
export default ViewDetail