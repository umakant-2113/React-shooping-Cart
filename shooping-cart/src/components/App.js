import React from 'react';
import '../style/index.css';
import Sidebar from './Sidebar';
import Products from './Products';
import data from '../data/data.json'
import Cart from './Cart';


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedSize: [],
            cartItems: []
        }
    }
    componentDidMount() {
        if (localStorage.carts) {
            this.setState({ cartItems: JSON.parse(localStorage.carts) || [] })
        }
        window.addEventListener('beforeunload', this.handleLocalStorage)
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleLocalStorage)
    }

    handleLocalStorage = () => {
        localStorage.setItem('carts', JSON.stringify(this.state.cartItems || []))
    }

    handleAddedToCart = (p) => {
        let isPresent = this.state.cartItems.findIndex((product) => product.id === p.id)

        if (isPresent !== -1) {
            this.incrementQuantity(p.id)
        } else {
            this.setState((preState) => ({
                cartItems: preState.cartItems.concat({ ...p, quantity: 1 })
            }))
        }
    }

    incrementQuantity = (id) => {
        this.setState((preState) => {
            let updatedCartItems = preState.cartItems.map((p) => {
                if (p.id === id) {
                    return {
                        ...p,
                        quantity: p.quantity + 1
                    }
                } else {
                    return p
                }
            })


            return {
                cartItems: updatedCartItems
            }
        })
    }

    decrementQuantity = (id) => {
        this.setState((preState) => {
            let updatedCartItems = preState.cartItems.map((p) => {
                if (p.id === id) {
                    if (p.quantity > 1) {
                        return {
                            ...p,
                            quantity: p.quantity - 1
                        }
                    }
                    return p
                }
                return p

            })

            return {
                cartItems: updatedCartItems
            }
        })
    }

    deletetItem = (id) => {
        this.setState((preState) => {
            let updatedCartItems = preState.cartItems.filter((p) => {
                return p.id !== id
            })

            return {
                cartItems: updatedCartItems
            }
        })
    }

    handleClick = (size) => {
        if (this.state.selectedSize.includes(size)) {
            this.setState((preState) => ({
                selectedSize: preState.selectedSize.filter((s) => s !== size)
            }))
        } else {
            this.setState((preState) => ({ selectedSize: preState.selectedSize.concat(size) }))
        }
    }

    render() {
        let { selectedSize } = this.state
        return (
            <>
                <section className='main'>
                    <Sidebar products={data.products} selectedSize={selectedSize} handleClick={this.handleClick} />
                    <Products products={data.products} selectedSize={selectedSize} handleAddedToCart={this.handleAddedToCart} />
                </section>
                <Cart
                    cartItems={this.state.cartItems}
                    decrementQuantity={this.decrementQuantity}
                    incrementQuantity={this.incrementQuantity}
                    deletetItem={this.deletetItem}
                />
            </>
        )
    }
}

export default App;