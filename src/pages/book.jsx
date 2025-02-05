import { useEffect, useState } from "react";
import { fetchAllBook } from "../services/api.service";
import BookTable from "../components/book/book.table";
import BookForm from "../components/book/book.form";
import UncontrolledBookForm from "../components/book/book.form.uncontrol";

const BookPage = () => {
    const [dataBook, setDataBook] = useState([])
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        loadBook();
    }, [current, pageSize])
    const loadBook = async () => {
        console.log(0)
        const res = await fetchAllBook(current, pageSize);
        console.log(1)
        if (res.data) {
            setDataBook(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
    }
    return (
        <div style={{ padding: '20px' }}>
            <UncontrolledBookForm
                loadBook={loadBook}
            />
            <BookTable
                dataUser={dataBook}
                loadBook={loadBook}
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