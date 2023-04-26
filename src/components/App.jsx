import Cards from "./Cards";
import products from "../data/products.json"

console.log(products)

export default function App(){
    
    return (
        <>
            <Cards productArray={products}/>
        </>
    )
}