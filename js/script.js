function setCartProductsNum() {
  cartProductsNum.textContent = `Number of products: ${cartList.length}`;
}

function createProduct(parent, imgUrl, productTitle, textPrice, idProduct) {
  const product = document.createElement("div");
  product.className = "product";
  product.setAttribute("id", idProduct);

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);

  product.addEventListener("click", (e) => {
    const localStorageValue = localStorage.getItem("totCartitems");
    if (localStorageValue) {
      cartList = JSON.parse(localStorageValue);
    }

    cartList.push(
      productsList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      )
    );
    setCartProductsNum();

    //Modal
    modal.style.opacity = "1";
    modal.style.zIndex = "4"; 
    //modal.style.display = 'block';
    modalP.textContent = `Your cart now contains the following number of products: ${cartList.length}`;
    
    

    //alert(`Your cart now contains the following number of products: ${cartList.length}`);
    // Nel caso in cui volessimo aggiungere una interazione col LocalStorage

    localStorage.setItem("totCartitems", JSON.stringify(cartList));


    // console.log("LOCAL STORAGE ==>", localStorageValue);
  });
}

function createImg(parent, imgUrl, productTitle) {
  const image = document.createElement("img");
  image.src = imgUrl;
  image.alt = productTitle;

  parent.appendChild(image);
}

function createText(parent, productTitle, textPrice) {
  const title = document.createElement("h4");
  title.textContent = productTitle;

  const price = document.createElement("strong");
  price.textContent = `${textPrice} $`;

  parent.append(title, price);
}

function renderProducts(listItems) {
  listItems.map((product) => {
    createProduct(
      wrapperProducts,
      product.image,
      product.title,
      product.price,
      product.id
    );
  });
}

function handleFilterSearch() {
  wrapperProducts.classList.add("sideViewAnim");

  document
    .querySelectorAll(".product")
    .forEach((product) => wrapperProducts.removeChild(product));

  renderProducts(
    productsList.filter((product) =>
      product.title
        .toLowerCase()
        .includes(inputFilterSearch.value.toLowerCase())
    )
  );

  setTimeout(() => {
    wrapperProducts.classList.remove("sideViewAnim");
  }, 1000);
}


function handleGoCartBtn(){
  document.querySelectorAll('.product')
  .forEach((product) => wrapperProducts.removeChild(product));
  
   renderProducts(JSON.parse(localStorageTot));
}


// Async await
const getProductsList = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  productsList = data;

  // Nella eventualità di aggiungere una quantità per prodotto
  // productsList = data.map((product) => {
  //   product.quantity = 0;
  //   return product;
  // });

  return renderProducts(data);
};

let productsList = [];
const wrapper = document.querySelector(".wrapper");
const wrapperProducts = document.querySelector(".wrapper__products");

// Parte inerente alla logica del carrello
let cartList = [];

const localStorageTot = localStorage.getItem("totCartitems");
const cartBtn = document.querySelector(".cartBtn");
const cartProductsNum = document.querySelector(".cartProductsNum");
const clearCartBtn = document.querySelector(".clearCart");
const showCartBtn = document.querySelector(".showCartBtn");
const inputFilterSearch = document.querySelector(".inputFilterSearch");
const modal = document.querySelector('.modal');
const continueBtn = document.querySelector('#continue');
const modalP = document.querySelector('#modal_p');
const goCartBtn = document.querySelector('.show__cart__btn');

// Flusso generale
const parsedTotCardItemsLen =
  JSON.parse(localStorage.getItem("totCartitems"))?.length || 0;

cartProductsNum.textContent = `Numbers of products: ${parsedTotCardItemsLen || 0}`;
getProductsList();

clearCartBtn.addEventListener("click", () => {
  cartList.length = 0;
  localStorage.removeItem("totCartitems");
  setCartProductsNum();
});

showCartBtn.addEventListener("click", handleFilterSearch);


//Feature that causes the `hero` to change image every 3 seconds

const urls = [
  'url(https://images.unsplash.com/photo-1603912699214-92627f304eb6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80)',
  'url(https://images.unsplash.com/photo-1573879500655-98f2012dd1db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
  'url(https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)',
];

const interval = setInterval(() => {
  let active = Math.floor(Math.random() * (urls.length));
  const bgWrapper = document.querySelector(".overlay");
  bgWrapper.style.background = urls[active];
     active++;
     if (active == urls.length) {active = 0;}
}, 3000);

//Modal

continueBtn.addEventListener('click', () => {
  modal.style.opacity = "0";
  modal.style.zIndex = "-1"; 
  window.location.reload();
   //Chiedere di un metodo più pulito!!! In pratica se il local storage è vuoto anche se aggiungo un oggetto
   //se clicco sul carrello è vuoto, se faccio refresh il problema sparisce
   //Quindi ho impostato il refresh al click della chiusura della modale
  //modal.style.display = 'none';
  })

  
  goCartBtn.addEventListener('click', () =>{
    

      handleGoCartBtn();
  });
  
  
  
