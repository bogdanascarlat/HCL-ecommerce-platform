import { CATEGORIES_QUERY } from "../../graphql/query"
import {  useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {applyFilters, clearFilters } from '../../features/products/productSlice'
import { useQuery } from "@apollo/client"
import useProtected from "../../hooks/useProtected"

const Categories = () => {

    useProtected()


    const { data, loading, error } = useQuery(CATEGORIES_QUERY, {fetchPolicy: "no-cache"})
    const selectedCategory = useSelector(state => state.products.filter.byCategory) || ""
    const dispatch = useDispatch()

    useEffect(()=>{
        return () =>{
            dispatch(clearFilters())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading || error) return (<p>No data</p>)

    const { getCategories } = data

    return (
        <div role="group" aria-label="Vertical button group">
        {
            getCategories.map(category => {
                const btnClass = (selectedCategory === category) ? (
                    " border-top border-bottom btn btn-dark btn-lg fw-bold text text-white fs-6 px-2"
                ) : (
                    "border-top border-bottom btn btn-light btn-lg fw-bold fs-6 px-2"
                )
                return (
                    <div key={category} style={{width: '100%'}}>
                        <button className={btnClass} style={{width: "100%", color: "grey", borderRadius: 0}} onClick={()=>{
                            (category === selectedCategory) ? dispatch(applyFilters({ byCategory: null})) : dispatch(applyFilters({ byCategory: category}))
                         } }>
                            <p className="text-start px-4 my-auto py-2">{category}</p>
                        </button>
                    </div>
                )
            })
        }
        </div>
    )
}

export default Categories
