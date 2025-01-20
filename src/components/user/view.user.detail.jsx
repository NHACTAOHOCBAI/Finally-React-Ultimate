import { Drawer } from "antd"

const ViewDetail = (props) => {
    const { setDataView, dataView, isModalDetailOpen, setIsModalDetailOpen } = props
    return (
        <Drawer title="Basic Drawer"
            open={isModalDetailOpen}
            onClose={() => {
                setDataView(null);
                setIsModalDetailOpen(false)
            }}>
            {dataView ?
                <>
                    <p>{`ID :${dataView.id}`}</p>
                    <p>{`Title :${dataView.title}`}</p>
                    <p>{`Body :${dataView.body}`}</p>
                    <div>
                        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/${dataView.avatar}`} />
                    </div>
                    <div>
                        <label htmlFor="btnUpload">Up Load file</label>
                        <input type="file" hidden id='btnUpload' />
                    </div>
                </>
                :
                <>
                    <p> have no data</p>
                </>}
        </Drawer>
    )
}
export default ViewDetail