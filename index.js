// ELEMENTS

const headerImageOpenMenu = document.querySelector(".header__nav__image");

const headerImageCloseMenu = document.querySelector(".image-close");

const modal = document.querySelector(".modal");

const headerNavMenu = document.querySelector(".header__nav__list");

const imageCarrito = document.querySelector(".image_carrito");

const cartProducts = document.querySelector(".cart-products");

const thumbnailItem = document.querySelectorAll(".thumbnail-item");

const headerSeparator = document.querySelector(".header__separator");

const quantityButtons = document.querySelectorAll(
  ".main__product__info__quantity__button"
);

const quantityNumber = document.querySelector(
  ".main__product__info__quantity__number"
);

const addToCartButton = document.getElementById("addToCartButton");

const productsContainer = document.querySelector(".products");

const leftArrow = document.getElementById("leftArrow");

const rightArrow = document.getElementById("rightArrow");

const mainImage = document.getElementById("mainImage");

// MODALES

const leftArrowModal = document.getElementById("leftArrowModal");

const rightArrowModal = document.getElementById("rightArrowModal");

const mainImageModal = document.getElementById("mainImageModal");

const thumbnailItemModal = document.querySelectorAll(".thumbnail-item_modal");

const mainProductDivModal = document.querySelector(".main__product_div_modal");

const closeModal = document.querySelector(".close_modal");

// FUNCTIONS

const manageShowEvent = (element, entranceAnimation, exitAnimation) => {
  if (element.classList.contains(exitAnimation)) {
    element.classList.replace(exitAnimation, entranceAnimation);
  } else element.classList.add(entranceAnimation);
};

const generateProductInCart = (quantity) => {
  let htmlCode = `
  <div class="product flex flex-col gap-6 p-4">

    <div class="product__product flex gap-4 items-center">
      <img src="./images/product-images/thumbnails/image-product-1-thumbnail.jpg" alt=""
        class="product__image__cart rounded-md">

      <div class="product__info">
        <p class="p_info product__name font-normal">
          Fall Limited Edition Sneakers
        </p>
        <p class="p_info product__price font-normal">
          $125.00 x
          <span class="quantity__products">${quantity}</span>
          <span class="final__price font-bold">$${parseFloat(
            125 * quantity
          ).toFixed(2)}
          </span>
        </p>
      </div>

      <img src="./images/icons/icon-delete.svg" alt="" id="delete">
    </div>

    <button
      class="product_checkout_button bg-Orange-Color flex items-center justify-center p-4 rounded-[8px] font-bold gap-4 hover:bg-[#f6a76a]"
      id="checkoutButton">
      Checkout
    </button>

  </div>
  `;

  productsContainer.innerHTML = htmlCode;

  const deleteButton = document.getElementById("delete");

  if (deleteButton)
    deleteButton.addEventListener("click", () => {
      productsContainer.innerHTML = `<p class="p-empty">Your cart is empty.</p>`;
      headerSeparator.style.setProperty("--after-content", '"0"', "important");
    });
};

let contador = 1;
const totalImages = 4;

const changeImage = (
  imageElement,
  direction,
  thumbnailElements,
  selectedClass
) => {
  if (direction === "left") {
    contador--;
    if (contador < 1) contador = 1;
  } else if (direction === "right") {
    contador++;
    if (contador > totalImages) contador = totalImages;
  }

  imageElement.src = `./images/product-images/image-product-${contador}.jpg`;

  if (thumbnailElements && selectedClass) {
    thumbnailElements.forEach((item, index) => {
      if (index === contador - 1) {
        item.classList.add(selectedClass);
      } else {
        item.classList.remove(selectedClass);
      }
    });
  }
};

const changeThumbnailItem = (thumbnailElement, imageElement, selectedClass) => {
  thumbnailElement.forEach((item, index) => {
    item.addEventListener("click", () => {
      const thumbnailImage = item.querySelector("img");
      item.classList.add(selectedClass);
      imageElement.src = thumbnailImage.src.replace(
        /\/thumbnails|-thumbnail/g,
        ""
      );
      thumbnailElement.forEach((otherItem) => {
        if (otherItem != item) {
          otherItem.classList.remove(selectedClass);
        }
      });
      contador = index + 1;
    });
  });
};

// EVENTS

headerImageOpenMenu.addEventListener("click", () => {
  modal.classList.replace("hidden", "block");
  manageShowEvent(
    headerNavMenu,
    "animate__slideInLeft",
    "animate__slideOutLeft"
  );
  headerNavMenu.classList.replace("hidden", "flex");
});

headerImageCloseMenu.addEventListener("click", () => {
  modal.classList.replace("block", "hidden");
  headerNavMenu.classList.replace(
    "animate__slideInLeft",
    "animate__slideOutLeft"
  );
});

let mostrandoCarrito = false;
imageCarrito.addEventListener("click", (e) => {
  if (!mostrandoCarrito) {
    cartProducts.classList.replace("hidden", "block");
    manageShowEvent(
      cartProducts,
      "animate__slideInDown",
      "animate__slideOutUp"
    );
    mostrandoCarrito = true;
    e.target.style.filter = "brightness(0)";
  } else {
    cartProducts.classList.replace(
      "animate__slideInDown",
      "animate__slideOutUp"
    );
    mostrandoCarrito = false;
    e.target.style.filter = "brightness(1)";
  }
});

quantityButtons.forEach((button) => {
  if (button.id == "plus") {
    button.addEventListener("click", () => {
      quantityNumber.textContent = parseInt(quantityNumber.textContent) + 1;
    });
  } else {
    button.addEventListener("click", () => {
      if (parseInt(quantityNumber.textContent) > 1) {
        quantityNumber.textContent = parseInt(quantityNumber.textContent) - 1;
      }
    });
  }
});

addToCartButton.addEventListener("click", () => {
  const quantity = parseInt(quantityNumber.textContent);

  if (quantity == 1) {
    headerSeparator.style.setProperty("--after-content", '"1"', "important");
  } else {
    headerSeparator.style.setProperty(
      "--after-content",
      `" ${quantity || 0}"`,
      "important"
    );
  }

  generateProductInCart(quantity);
  Toastify({
    text: "Product added to cart!",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "center",
    style: {
      background: "linear-gradient(to right, #ff7d1a, #da6105)",
      borderRadius: "10px",
    },
    stopOnFocus: true,
  }).showToast();
});

// ARROWS EVENTS

leftArrow.addEventListener("click", () =>
  changeImage(mainImage, "left", null, null)
);
rightArrow.addEventListener("click", () =>
  changeImage(mainImage, "right", null, null)
);

leftArrowModal.addEventListener("click", () =>
  changeImage(mainImageModal, "left", thumbnailItemModal, "selected_modal")
);
rightArrowModal.addEventListener("click", () =>
  changeImage(mainImageModal, "right", thumbnailItemModal, "selected_modal")
);

changeThumbnailItem(thumbnailItem, mainImage, "selected");
changeThumbnailItem(thumbnailItemModal, mainImageModal, "selected_modal");

mainImage.addEventListener("click", () => {
  modal.classList.replace("hidden", "block");
  mainProductDivModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  mainProductDivModal.style.display = "none";
  modal.classList.replace("block", "hidden");
});
