export default function Cart({
  productArray,
  cart,
  setCart,
  changeCartDisplay,
  initProductTotal,
  setConfirmedPurchase,
  confirmedPurchase,
}) {
  let totalPrice = 0;
  //Återställer allt när varukorgen tömms
  function handleEmptyCartAction() {
    setCart([]);
    initProductTotal();
    setConfirmedPurchase(false);
    changeCartDisplay(false);
  }
  //genomför köp, skickar ny produktlager till firebase, och återställer allt
  function handlePurchase() {
    if (!cart.length) return;
    productArray.forEach((dbProduct) => {
      cart.forEach((cartProduct) => {
        if (cartProduct.name === dbProduct.name) {
          dbProduct.quantity =
            parseInt(dbProduct.quantity) - parseInt(cartProduct.quantity);
        }
      });
    });
    setConfirmedPurchase(true);
    putToFirebase(productArray);
    initProductTotal();
    setCart([]);
  }
  return (
    <>
      <h3>Kundvagn</h3>
      {confirmedPurchase && <h4>Köpet genomfört</h4>}
      <ul>
        {cart.map((product) => {
          totalPrice += product.price * product.quantity;
          return (
            <li key={product.name}>
              {product.name}: {product.quantity} st
            </li>
          );
        })}
      </ul>
      <p>Total: {totalPrice}kr</p>
      <button onClick={handlePurchase}>Confirm purchase</button>
      <button onClick={handleEmptyCartAction}>Empty Cart</button>
    </>
  );

  async function putToFirebase(message) {
    const url =
      "https://webshop-81de9-default-rtdb.europe-west1.firebasedatabase.app/.json";
    const options = {
      method: "PUT",
      body: JSON.stringify({
        products: message,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
  }
}
