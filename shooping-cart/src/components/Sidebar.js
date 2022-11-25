function Sidebar(props) {
    let { products, selectedSize } = props

    let sizes = products.reduce((acc, cv) => {
        acc = acc.concat(cv.availableSizes);
        return acc
    }, [])

    let uniqueSizes = [...new Set(sizes)];
    return (
        <aside>
            < ul >
                {
                    uniqueSizes.map((size, i) => (
                        <li key={i}
                            className={`flex justify-center align-center ${selectedSize.includes(size) ? 'active---tag' : ''}`}
                            onClick={() => props.handleClick(size)}>
                            {size}
                        </li>
                    ))
                }

            </ul >
        </aside>
    )
}

export default Sidebar