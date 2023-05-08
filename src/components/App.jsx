import Sidebar from "./Sidebar";
import Status from "./Status";
import Cards from "./Cards";
import Cart from "./Cart";
import "../css/style.css";
import { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("");
  const [displayCart, setDisplayCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [productTotal, setProductTotal] = useState(0);
  const [confirmedPurchase, setConfirmedPurchase] = useState(false);

  function changeCartDisplay(boolDisplayCart) {
    setDisplayCart(boolDisplayCart);
  }

  function changeProductTotal(intProductsToAdd) {
    setProductTotal(productTotal + parseInt(intProductsToAdd));
  }

  function initProductTotal() {
    setProductTotal(0);
  }
  async function getProducts() {
    setStatus("loading");
    const res = await fetch(
      `https://webshop-81de9-default-rtdb.europe-west1.firebasedatabase.app/products.json`
    );
    const data = await res.json();
    if (Array.isArray(data)) {
      //Loopa igenom datan, spara ner det som ska användas, är för tillfället allt men kan kanske ändras senare
      const newProducts = data.map((product) => {
        return {
          type: product.type,
          name: product.name,
          quantity: product.quantity,
          price: product.price,
        };
      });
      setProducts(newProducts);
      setStatus("success");
    } else {
      setStatus("failed");
    }
  }
  useEffect(() => {
    getProducts(products);
  }, []);
  return (
    <>
      <h1>ChessShop</h1>
      <div className="container">
        <Sidebar
          changeCartDisplay={changeCartDisplay}
          className="sidebar"
          productTotal={productTotal}
          setConfirmedPurchase={setConfirmedPurchase}
        />
        <div className="content-container">
          {displayCart ? (
            <Cart
              cart={cart}
              initProductTotal={initProductTotal}
              changeCartDisplay={changeCartDisplay}
              setCart={setCart}
              productArray={products}
              setConfirmedPurchase={setConfirmedPurchase}
              confirmedPurchase={confirmedPurchase}
            />
          ) : (
            <div id="card-container">
              <Cards
                productArray={products}
                cart={cart}
                changeProductTotal={changeProductTotal}
              />
            </div>
          )}
        </div>
        {(status === "loading" || status === "failed") && (
          <Status status={status} />
        )}
      </div>
    </>
  );
}
