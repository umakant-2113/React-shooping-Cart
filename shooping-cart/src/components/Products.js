import React from 'react'
import OrderBy from './OrderBy'


class Products extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedOrder: ''
        }
    }
    handleOrderBy = ({ target }) => {
        this.setState({ selectedOrder: target.value })
    }

    handleOrderProducts = (order, sizes, product) => {
        let sortedProducts = [...product]

        if (sizes.length > 0) {
            sortedProducts = sortedProducts.filter((p) => {
                for (let size of sizes) {
                    if (p.availableSizes.includes(size)) {
                        return true
                    }
                }
            })
        }


        if (order === 'high') {
            sortedProducts = [...sortedProducts].sort((a, b) => b.price - a.price)
        }

        if (order === 'low') {
            sortedProducts = [...sortedProducts].sort((a, b) => a.price - b.price)
        }

        return sortedProducts
    }

    render() {
        let { selectedOrder } = this.state
        let products = this.handleOrderProducts(selectedOrder, this.props.selectedSize, this.props.products)
        return (
            <>

                <div>
                    <OrderBy selectedOrder={selectedOrder} handleOrderBy={this.handleOrderBy} />
                    <article className='product'>
                        {products.map((p) => <Product key={p.id} productsItem={p} handleAddedToCart={this.props.handleAddedToCart} />)}
                    </article>
                </div>
            </>
        )
    }
}


function Product(props) {
    let { productsItem, handleAddedToCart } = props
    return (

        <>

            <div className='product-item'>
                <figure>
                    <img src={'/static/products/' + productsItem.sku + '_1.jpg'} alt={productsItem.sku} />
                </figure>

                <div className='flex flex-column align-center'>
                    <h2 className='margin-top'>{productsItem.title}</h2>
                    <span className='border-yellow'></span>
                    <p>{productsItem.currencyFormat}{productsItem.price}</p>
                    <button
                        className='btn center'
                        onClick={() => handleAddedToCart(productsItem)}>
                        Add to cart
                    </button>

                    {productsItem.isFreeShipping ? <button className='free-btn'>free shipping </button> : ''}
                </div>

            </div>
        </>
    )
}

export default Products