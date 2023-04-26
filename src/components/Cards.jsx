
export default function Cards({productArray}){
    console.log(productArray)

    const cardFormat = productArray.map(product => 
            
            <article className="card">
            
            <img src={srcPath(product).href} alt="piece image" height={53} width={53}/>
            <h1 className="card-title">{product.name}</h1>
            <p className="card-description">{product.description}</p>
            {product.onSale ? (<p className="card-price">{product.price}</p>) : (<p className="card-price-discount">{product.price}</p>)}
            <p className="card-quantity">{product.quantity}</p>
        </article>)



    return (
            <>
                {cardFormat}
            </>
     /*    <article className="card">
            <img src="" alt="" />
            <h1 className="card-title">{productArray[0].name}</h1>
            <p className="card-description">{productArray[0].description}</p>
            {productArray[0].onSale ? (<p className="card-price">{productArray[0].price}</p>) : (<p className="card-price-discount">{productArray[0].price}</p>)}
            <p className="card-quantity">{productArray[0].quantity}</p>
        </article> */
    )
}

function srcPath(product){
    const imgUrl = new URL(`../img/${product.url}`, import.meta.url);
    console.log(imgUrl)
    console.log(imgUrl.href)
    return imgUrl;
}