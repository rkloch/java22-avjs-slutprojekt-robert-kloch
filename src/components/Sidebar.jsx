export default function Sidebar({
  changeCartDisplay,
  productTotal,
  setConfirmedPurchase,
}) {
  function handleClickCart() {
    changeCartDisplay(true);
  }
  function handleClickProducts() {
    setConfirmedPurchase(false);
    changeCartDisplay(false);
  }
  return (
    <div className="sidebar">
      <h2 id="products-sidebar" onClick={handleClickProducts}>
        Produkter
      </h2>
      <h2 id="cart-sidebar" onClick={handleClickCart}>
        Kundvagn({productTotal})
      </h2>
    </div>
  );
}
