import React from 'react'

function CartItems(props) {
    let product = props.item
    let { decrementQuantity, incrementQuantity, deletetItem } = props
    return (
        <>
            <div className='flex margin-botttom'>

                <figure className='cart-img'>
                    <img src={'/static/products/' + product.sku + '_2.jpg'} alt={product.sku} />
                </figure>

                <div className=" flex justify-even width-100">

                    <div className="line-2" >
                        <h2>
                            {product.title}
                        </h2>
                        <p
                            className="grey">{product.style}
                        </p>
                        <span
                            className="grey">print Quantity: {product.quantity}
                        </span>
                    </div>

                    <div className="flex flex-column line-2 left">
                        <p
                            className="yellow weight-500">{product.currencyFormat}
                            <br />
                            {product.price}
                        </p>

                        <Increment incrementQuantity={() => incrementQuantity(product.id)} />
                        <Decrement decrementQuantity={() => decrementQuantity(product.id)} />

                    </div>
                    <div>
                        <p className="black curser" onClick={() => props.deletetItem(product.id)} >✖ </p>
                    </div>

                </div>


            </div>

        </>
    )
}



function Increment(props) {
    return (
        <span
            onClick={props.incrementQuantity}
            className='curser'>➕
        </span>
    )
}


function Decrement(props) {
    return (
        <span
            onClick={props.decrementQuantity}
            className='curser'>➖
        </span>
    )
}
export default CartItems