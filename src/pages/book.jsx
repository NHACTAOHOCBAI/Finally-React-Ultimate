import { useEffect, useState } from "react";
import { fetchAllBook } from "../services/api.service";
import BookTable from "../components/book/book.table";
import BookForm from "../components/book/book.form";

const BookPage = () => {
    const [dataBook, setDataBook] = useState([])
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        loadUser();
    }, [current, pageSize])
    const loadUser = async () => {
        const res = await fetchAllBook(current, pageSize);
        if (res.data) {
            setDataBook(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
    }
    return (
        <div style={{ padding: '20px' }}>
            <BookForm
                loadUser={loadUser}
            />
            <BookTable
                dataUser={dataBook}
                loadUser={loadUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
            />
        </div>
    )
}
export default BookPage