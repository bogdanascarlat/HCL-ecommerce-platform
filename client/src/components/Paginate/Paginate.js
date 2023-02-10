import { useEffect } from "react"
import { useSelector } from "react-redux"

/* eslint-disable jsx-a11y/anchor-is-valid */
const Paginate = ({ numberOfPages, currentPage, setCurrentPage }) => {
    
    const products = useSelector(state => state.products.value) 

    useEffect(()=>{
        setCurrentPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

    return (
        <nav aria-label="...">
            <ul className="pagination">
                <li key={"page-1"} className={currentPage === 1 ? "page-item disabled" : "page-item"}>
                    <button onClick={() => setCurrentPage(prev => prev - 1)} className="page-link">Previous</button>
                </li>
                {
                    [...new Array(numberOfPages).keys()]
                        .map(page => {
                            return <li key={page + 1} className="page-item">
                                <button onClick={() => setCurrentPage(page + 1)} className={currentPage === (page + 1) ? "page-link active" : "page-link"} >
                                    {page + 1}
                                </button>
                            </li>
                        })
                }
                <li key={"page" + numberOfPages} className="page-item">
                    <button onClick={() => setCurrentPage(prev => prev + 1)} className={currentPage === numberOfPages ? "page-link disabled" : "page-link"}>Next</button>
                </li>
            </ul>
        </nav>
    )

}
export default Paginate