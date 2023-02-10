import React from 'react'

const SwitchBar = ({setProductsPerPage}) => {
  return (
    <nav className="navbar navbar-light bg-light mb-3 w-100" style={{maxHeight: "60px", borderRadius: "10px"}}>
      <div className="d-flex column align-items-center">
      <span className='ms-3'><label>Products per page</label></span>
      <span className='ms-3'>
        <select defaultValue={20} className="form-select" aria-label="Default select example" onChange={(e) => setProductsPerPage( Number.parseInt(e.target.value))}>
          <option  value="10">10</option>
          <option  value="20">20</option>
          <option value="99999">All</option>
        </select>
      </span>
    
  </div>
</nav>
  )
}

export default SwitchBar