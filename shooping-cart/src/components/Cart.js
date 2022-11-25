import React from 'react'
import CartItems from './CartItems'

class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            isOpen: false
        }
    }

    open = () => {
        this.setState({ isOpen: true })
    }

    close = () => {
        this.setState({ isOpen: false })
    }

    render() {
        let { isOpen } = this.state
        let { cartItems, incrementQuantity, decrementQuantity, deletetItem } = this.props

        let totalQuantity = cartItems.reduce((acc, cv) => {
            acc = acc + cv.quantity
            return acc
        }, 0)

        let totalAmount = cartItems.reduce((acc, cv) => {
            acc = acc + cv.price * cv.quantity
            return acc
        }, 0)

        if (!isOpen) {
            return <ClosedCart open={this.open} cartItems={cartItems} totalQuantity={totalQuantity} />
        }
        return (
            <>
                <button className='close flex justify-center align-center curser' onClick={this.close}>✖</button>
                <div className='cart padding'>
                    <div className='flex justify-center align-center'>
                        <figure>
                            <img src='/static/bag-icon.png' alt='hh' />
                        </figure>

                        <span className='popup popup---cart weight-500'>
                            {totalQuantity}
                        </span>

                        <h2 className='font-1   margin-left'>Cart</h2>
                    </div>

                    <hr />
                    {cartItems.map((item) => <CartItems
                        item={item}
                        decrementQuantity={decrementQuantity}
                        incrementQuantity={incrementQuantity}
                        deletetItem={deletetItem}
                    />)}


                    <div className="flex justify-space width-100">

                        {totalAmount > 0 ?
                            <> <h2>SUBTOTAL</h2> <p className='weight-500'>$ {Math.floor(totalAmount)}.00 </p> </>
                            : ''}
                    </div>

                    {totalAmount > 0 ? <div className='flex justify-center flex-column'>
                        <button className='checkout' onClick={() => alert('Thanks for perchasing with shopping cart 🤟😎')}>checkout</button>
                    </div> : ''}
                </div>
            </>
        )
    }
}


function ClosedCart(props) {
    return (
        <>
            <div className='icon'>
                <figure onClick={props.open}>
                    <img src='/static/bag-icon.png' alt='hh' />
                </figure>
            </div>
            <span className='popup popup---main weight-500'>{props.totalQuantity}</span>
        </>
    )
}

export default Cart