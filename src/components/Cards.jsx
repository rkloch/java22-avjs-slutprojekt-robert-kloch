export default function Cards({ productArray, cart, changeProductTotal }) {
  let cardFormat;
  let tempInput = 0;

  function handleSubmit(event) {
    event.preventDefault();
    if (tempInput == 0) return; //Händer inget om kvantiteten som ska läggas till är 0
    let nameExists = false; //Ifall namnet som producten har redan finns i varukorgen så ändras bara kvantiteten
    //Loopar bara genom varukorgen för att kolla
    cart.forEach((product) => {
      if (event.target.getAttribute("productname") === product.name) {
        nameExists = true;
        product.quantity = parseInt(tempInput) + parseInt(product.quantity);
      }
    });
    //Annars så läggs ett nytt objekt till i varukorgen
    if (!nameExists) {
      let obj = {};
      obj.price = event.target.getAttribute("price");
      obj.name = event.target.getAttribute("productname");
      obj.quantity = tempInput;
      cart.push(obj);
    }
    changeProductTotal(tempInput); //Ökar produktantalet
    event.target.reset();
  }

  function handleInputChange(event) {
    tempInput = event.target.value;
  }
  //Fixar så att man inte kan köpa mer än det finns i lager, ifall det ligger i varukorgen redan så räknas det som bokat
  function getMaxProductAvailability(product, cart) {
    let availableQuantity = parseInt(product.quantity);
    cart.forEach((cartProduct) => {
      if (cartProduct.name === product.name)
        availableQuantity -= cartProduct.quantity;
    });
    return availableQuantity;
  }

  //Format för card med form input
  if (Array.isArray(productArray)) {
    cardFormat = productArray.map((product) => (
      <article className="card" key={product.type}>
        <img src={imageObj(product)} />
        <h1 className="card-title">{product.name}</h1>
        <p className="card-description">Price: {product.price}kr</p>
        <p className="card-quantity">
          Quantity left: {getMaxProductAvailability(product, cart)}
        </p>

        <form
          onSubmit={handleSubmit}
          id={product.type}
          price={product.price}
          productname={product.name}
        >
          <input
            type="number"
            max={getMaxProductAvailability(product, cart)}
            min="0"
            onChange={handleInputChange}
            placeholder={tempInput}
          />
          <button>Add to cart</button>
        </form>
      </article>
    ));
  }

  return <>{cardFormat}</>;
}
//Extremt lat sätt för att få parcel att spara bildfilerna i docsmappen, brute force och pantat men funkar
function imageObj(product) {
  let imgUrl;
  switch (product.type) {
    case "whitePawn":
      imgUrl = new URL("../img/Chess_plt45.svg", import.meta.url);
      break;
    case "whiteKing":
      imgUrl = new URL("../img/Chess_klt45.svg", import.meta.url);
      break;
    case "whiteQueen":
      imgUrl = new URL("../img/Chess_qlt45.svg", import.meta.url);
      break;
    case "whiteRook":
      imgUrl = new URL("../img/Chess_rlt45.svg", import.meta.url);
      break;
    case "whiteKnight":
      imgUrl = new URL("../img/Chess_nlt45.svg", import.meta.url);
      break;
    case "whiteBishop":
      imgUrl = new URL("../img/Chess_blt45.svg", import.meta.url);
      break;
    case "blackPawn":
      imgUrl = new URL("../img/Chess_pdt45.svg", import.meta.url);
      break;
    case "blackKing":
      imgUrl = new URL("../img/Chess_kdt45.svg", import.meta.url);
      break;
    case "blackQueen":
      imgUrl = new URL("../img/Chess_qdt45.svg", import.meta.url);
      break;
    case "blackRook":
      imgUrl = new URL("../img/Chess_rdt45.svg", import.meta.url);
      break;
    case "blackKnight":
      imgUrl = new URL("../img/Chess_ndt45.svg", import.meta.url);
      break;
    case "blackBishop":
      imgUrl = new URL("../img/Chess_bdt45.svg", import.meta.url);
      break;
  }
  return imgUrl.href;
}
