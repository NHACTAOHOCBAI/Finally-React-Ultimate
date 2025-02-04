
import { Drawer } from "antd";

const ViewBookDetail = (props) => {
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
                    <p>{`ID :${dataView._id}`}</p>
                    <p>{`Tiêu đề :${dataView.mainText}`}</p>
                    <p>{`Tác giả :${dataView.author}`}</p>
                    <p>{`Thể loại :${dataView.category}`}</p>
                    <p>{`Giá :${new Intl.NumberFormat('vi-VN',
                        { style: 'currency', currency: 'VND' }).format(dataView.price)}`}</p>
                    <p>{`Số lượng :${dataView.quantity}`}</p>
                    <p>{`Đã bán :${dataView.sold}`}</p>
                    <div>
                        <img
                            width={100}
                            height={100}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataView.thumbnail}`} />
                    </div>
                </>
                :
                <>
                    <p> have no data</p>
                </>}
        </Drawer>
    )
}
export default ViewBookDetail