import { Drawer } from "antd"
import { useState } from "react";

const ViewDetail = (props) => {
    const { setDataView, dataView, isModalDetailOpen, setIsModalDetailOpen } = props
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState()

    const handleOnChangeFile = async (event) => {
        if (!event.target.files || event.target.files.length == 0) {
            // setSelectedFile(null);
            // setPreview(null);
            return;
        }

        const file = event.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    }
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
                        <img src={preview} />
                    </div>
                    <div>
                        <label htmlFor="btnUpload">Up Load file</label>
                        <input type="file"
                            hidden id='btnUpload'
                            onChange={handleOnChangeFile}
                        // nhung tham so dau vao cua onchange se tu dong vao ham kia
                        />
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