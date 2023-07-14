// Retrieve cart data from local storage
var cartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

// Get the cart items container element
var cartItemsContainer = document.getElementById('cart-items-container');
var emptyCartMessage = document.getElementById('empty-cart-message');
var cartCountElement = document.getElementById('cart-count');
cartCountElement.textContent = cartData.length;
// Check if there are items in the cart
if (cartData.length > 0) {
  emptyCartMessage.style.display = 'none';

  // Iterate over each item in the cart
  for (var i = 0; i < cartData.length; i++) {
    var cartItem = cartData[i];

    // Create a new cart item element
    var cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');

    // Create elements for displaying the cart item data
    var imageElem = document.createElement('img');
    imageElem.classList.add('course-image');
    imageElem.src = cartItem.plink;
    cartItemElement.appendChild(imageElem);
    
    var titleElement = document.createElement('h3');
    titleElement.textContent = cartItem.title;
    cartItemElement.appendChild(titleElement);

    var subtitleElement = document.createElement('p');
    subtitleElement.textContent = cartItem.subtitle;
    cartItemElement.appendChild(subtitleElement);

    var priceElement = document.createElement('p');
    priceElement.textContent = 'Price: ' + cartItem.price;
    cartItemElement.appendChild(priceElement);

    var instructorElement = document.createElement('p');
    instructorElement.textContent = 'Instructor: ' + cartItem.inst;
    cartItemElement.appendChild(instructorElement);

    var platformElement = document.createElement('p');
    platformElement.textContent = 'Platform: ' + cartItem.subtitle;
    cartItemElement.appendChild(platformElement);

    var ratingElement = document.createElement('p');
    ratingElement.textContent = 'Rating: ' + cartItem.rating;
    cartItemElement.appendChild(ratingElement);

    var tagsElement = document.createElement('p');
    tagsElement.textContent = 'Tags: ' + cartItem.tags;
    cartItemElement.appendChild(tagsElement);

    
    var linkElement = document.createElement('a');
    linkElement.href = cartItem.link;
    linkElement.textContent = 'Course Link';
    linkElement.target = '_blank';
    cartItemElement.appendChild(linkElement);
    
    // Create a "Remove from Cart" button
    var removeFromCartBtn = document.createElement('button');
    removeFromCartBtn.classList.add('remove-from-cart');
    removeFromCartBtn.textContent = 'Remove from Cart';

    removeFromCartBtn.addEventListener('click', createRemoveFromCartHandler(i));
    cartItemElement.appendChild(removeFromCartBtn);
    cartItemsContainer.appendChild(cartItemElement);
  }

  // Create a "Remove All" button
    var removeAllBtn = document.createElement('button');
    removeAllBtn.classList.add('remove-all');
    removeAllBtn.textContent = 'Remove All';

  removeAllBtn.addEventListener('click', function() {
    // Clear the cart data in local storage
    localStorage.removeItem('cart');

    // Refresh the page to reflect the empty cart
    location.reload();
  });

  // Append the "Remove All" button to the cart items container
  cartItemsContainer.appendChild(removeAllBtn);
} else {
  emptyCartMessage.style.display = 'block';
}

// Function to handle the "Remove from Cart" button click
function createRemoveFromCartHandler(index) {
  return function() {
    // Retrieve cart data from local storage
    var cartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    // Remove the item from the cart data array
    cartData.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartData));
    location.reload();
  };
}
