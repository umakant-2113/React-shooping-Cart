import React from 'react'

function OrderBy(props) {
    let { selectedOrder, handleOrderBy } = props
    return (
        <div className='filter'>
            <label htmlFor="order">Order by</label>
            <select name='sort' value={selectedOrder} id="order" onChange={handleOrderBy} >
                <option value="" >Select</option>
                <option value="low" >Lowest to highest</option>
                <option value="high" >Highest to lowest</option>
            </select>
        </div>
    )
}

export default OrderBy