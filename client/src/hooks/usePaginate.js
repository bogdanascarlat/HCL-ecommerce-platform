import { useEffect, useState } from "react"

function usePaginate(items, itemsPerPage){

    useEffect(()=>{
        setCurrentPage(1)
    },[itemsPerPage])

    const [currentPage, setCurrentPage] = useState(1)
    const numberOfPages =  Math.ceil(items.length / itemsPerPage)
    const shown = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage )
    return [shown, currentPage, setCurrentPage, numberOfPages]
}

export default usePaginate