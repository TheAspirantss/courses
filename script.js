function createCard(title, subtitle, price, link, inst, plink, rating, tags) {
  var cardContainer = document.getElementById("cards-container");

  var card = document.createElement("div");
  card.classList.add("card");

  var imageElem = document.createElement("img");
  imageElem.classList.add("course-image");
  imageElem.src = plink;
  card.appendChild(imageElem);

  var titleElem = document.createElement("div");
  titleElem.classList.add("title");
  titleElem.textContent = title;
  card.appendChild(titleElem);

  var bgSubtitleDiv = document.createElement("div");
  bgSubtitleDiv.classList.add("bg-subtitle");

  var bgDiv = document.createElement("div");
  bgDiv.classList.add("card-bg");
  bgDiv.classList.add(subtitle.toLowerCase().replace(" ", "-"));
  bgSubtitleDiv.appendChild(bgDiv);
  //console log here for platform name & class
  var subtitleElem = document.createElement("div");
  subtitleElem.classList.add("subtitle");
  subtitleElem.textContent = subtitle;
  bgSubtitleDiv.appendChild(subtitleElem);

  card.appendChild(bgSubtitleDiv);

  var instructorElem = document.createElement("div");
  instructorElem.classList.add("instructor");
  instructorElem.textContent = "Instructor: " + inst;
  card.appendChild(instructorElem);

  var tagsElem = document.createElement("div");
  tagsElem.classList.add("tags");
  tagsElem.textContent = "Tag: " + tags;
  card.appendChild(tagsElem);

  var ratingPriceDiv = document.createElement("div");
  ratingPriceDiv.classList.add("rating-price");
  var ratingPriceDiv = document.createElement("div");
  ratingPriceDiv.classList.add("rating-price");

  var ratingElem = document.createElement("div");
  ratingElem.classList.add("rating");
  var ratingValueElem = document.createElement("div");
  ratingValueElem.classList.add("rating-value");
  ratingValueElem.textContent = "Rating: " + rating;

  ratingPriceDiv.appendChild(ratingValueElem);
  var starRating = parseFloat(rating);
  for (var i = 1; i <= starRating; i++) {
    var starIcon = document.createElement("span");
    starIcon.classList.add("star");
    ratingElem.appendChild(starIcon);
  }
  ratingPriceDiv.appendChild(ratingElem);

  var priceElem = document.createElement("div");
  priceElem.classList.add("price");
  priceElem.textContent = "₹" + price;
  if (price === "0") {
    card.classList.add("free");
  }
  ratingPriceDiv.appendChild(priceElem);

  card.appendChild(ratingPriceDiv);

  var linkElem = document.createElement("a");
  linkElem.classList.add("button");
  linkElem.href = link;
  linkElem.textContent = "Explore";
  linkElem.target = "_blank";
  card.appendChild(linkElem);

  var compareBtn = document.createElement("button");
  compareBtn.classList.add("compare-button");
  compareBtn.textContent = "Add to Compare";
  compareBtn.addEventListener("click", function() {
    addToCompare(title, subtitle, price, link, inst, plink, rating, tags);
    compareBtn.textContent = "Added";
  });
  card.appendChild(compareBtn);

  var addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("add-to-cart");
  addToCartBtn.textContent = "Save Course";

  addToCartBtn.addEventListener("click", function() {
    // Get the existing cart data from the local storage or create an empty array
    var cartData = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    // Create an object with the card data
    var cardData = {
      title: title,
      subtitle: subtitle,
      price: price,
      link: link,
      inst: inst,
      plink: plink,
      rating: rating,
      tags: tags,
    };

    // Add the card data to the cart array
    cartData.push(cardData);

    // Store the updated cart data in the local storage
    localStorage.setItem("cart", JSON.stringify(cartData));
    addToCartBtn.textContent = "Saved";
    var totalSaved = document.getElementById("cart-count").innerHTML;
    document.getElementById("cart-count").innerHTML = parseInt(totalSaved) + 1;
  });

  // Append the "Add to Cart" button to the card
  card.appendChild(addToCartBtn);

  cardContainer.appendChild(card);
}

//--------------------------------------------------------------------------------------
function displayCards(data) {
  var cardContainer = document.getElementById("cards-container");
  cardContainer.innerHTML = "";

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    createCard(
      row.cn,
      row.pf,
      row.pr,
      row.link,
      row.inst,
      row.plink,
      row.rating,
      row.tags
    );
    var card = document.getElementsByClassName("card")[i];
    card.classList.add(row.pf.toLowerCase());
  }

  filterCards();

}

//-------------------------------------------------------------------------------------------------------------------

function searchCards() {
  var searchQuery = document.getElementById("searchBar").value;
  var cards = document.getElementsByClassName("card");
  var count = 0;

  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var titleElem = card.getElementsByClassName("title")[0];
    var subtitleElem = card.getElementsByClassName("subtitle")[0];
    var priceElem = card.getElementsByClassName("price")[0];
    var instructorElem = card.getElementsByClassName("instructor")[0];
    var tagElem = card.getElementsByClassName("tags")[0];
    var title = titleElem.textContent;
    var subtitle = subtitleElem.textContent;
    var price = priceElem.textContent;
    var instructor = instructorElem.textContent;
    var tag = tagElem.textContent;

    var hasMatch = false;

    if (title.toLowerCase().includes(searchQuery.toLowerCase())) {
      titleElem.innerHTML = highlightMatch(title, searchQuery);
      hasMatch = true;
    } else {
      titleElem.innerHTML = title;
    }

    if (subtitle.toLowerCase().includes(searchQuery.toLowerCase())) {
      subtitleElem.innerHTML = highlightMatch(subtitle, searchQuery);
      hasMatch = true;
    } else {
      subtitleElem.innerHTML = subtitle;
    }

    if (price.toLowerCase().includes(searchQuery.toLowerCase())) {
      priceElem.innerHTML = highlightMatch(price, searchQuery);
      hasMatch = true;
    } else {
      priceElem.innerHTML = price;
    }

    if (instructor.toLowerCase().includes(searchQuery.toLowerCase())) {
      instructorElem.innerHTML = highlightMatch(instructor, searchQuery);
      hasMatch = true;
    } else {
      instructorElem.innerHTML = instructor;
    }

    if (tag.toLowerCase().includes(searchQuery.toLowerCase())) {
      tagElem.innerHTML = highlightMatch(tag, searchQuery);
      hasMatch = true;
    } else {
      tagElem.innerHTML = tag;
    }

    if (hasMatch) {
      card.style.display = "block";
      count++;
    } else {
      card.style.display = "none";
    }
  }

  if (count === 0) {
    document.getElementById("nocourses").src = "nocourse_vyom.gif";
  } else {
    document.getElementById("nocourses").src = "";
  }
}

//-----------------------------------------------------------------------------------------

function highlightMatch(text, searchQuery) {
  var regex = new RegExp(searchQuery, "gi");
  return text.replace(
    regex,
    "<span style='background-color: #70aaff;font-size:18px;'>$&</span>"
  );
}

//------------------------------------------------------------------------------------------

function filterCards() {
  var count = 0;
  var priceFilter = document.getElementById("price-filter").value;
  var platformFilter = document.getElementById("platform-filter").value;
  var tagsFilter = document.getElementById("tags-filter").value;
  var cards = document.getElementsByClassName("card");
  var currentPage = 1;

  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var priceElem = card.getElementsByClassName("price")[0];
    var platformElem = card.getElementsByClassName("subtitle")[0];
    var tagsElem = card.getElementsByClassName("tags")[0];

    var price = priceElem.textContent;
    var platform = platformElem.textContent;
    var tags = tagsElem.textContent;

    if (
      (priceFilter === "all" ||
        (priceFilter === "free" && price === "₹0") ||
        (priceFilter === "paid" && price != "₹0")) &&
      (platformFilter === "all" || platformFilter === platform) &&
      (tagsFilter === "all" || tags.includes(tagsFilter))
    ) {
      card.style.display = "block";
      count++;
    } else {
      card.style.display = "none";
    }
  }
  console.log(count);
  if (count === 0) {
    document.getElementById("nocourses").src = "nocourse_vyom.gif";
  } else {
    document.getElementById("nocourses").src = "";
  }
}

//-----------------------------------------------------------------------------------------------------------

function filterCards2() {
  var tagsFilter2 = localStorage.getItem("inputValue");
  if (tagsFilter2) {
    document.getElementById("tags-filter").value = tagsFilter2;
    console.log(document.getElementById("tags-filter").value);
  }

  filterCards();
  localStorage.removeItem("inputValue");
}

if (localStorage.getItem("inputValue")) {
  filterCards2(); // Call the function
}

//---------------------------------------------------------------------------------------

fetch("crsnew_1818.csv")
  .then(function(response) {
    return response.text();
  })
  .then(function(csvText) {
    var rows = csvText.split("\n");
    var data = [];

    // Parse CSV rows, excluding the first row
    for (var i = 1; i < rows.length; i++) {
      var columns = rows[i].split(",");
      if (columns.length === 8) {
        var row = {
          cn: columns[0],
          pr: columns[1],
          pf: columns[2],
          link: columns[3],
          inst: columns[4],
          plink: columns[5],
          rating: columns[6],
          tags: columns[7],
        };
        data.push(row);
      }
    }

    displayCards(data);
  })

  .catch(function(error) {
    console.log("Error:", error);
  });


