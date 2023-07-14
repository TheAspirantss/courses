var compareData = [];

function addToCompare(title, subtitle, price, link, inst, plink, rating, tags) {
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
  var index = compareData.findIndex(function(item) {
    return item.title === cardData.title && item.subtitle === cardData.subtitle;
  });
  var compareBtn = document.querySelector(".card .compare-button");
  if (index === -1) {
    compareData.push(cardData); // Add card data to comparison
  } else {
    compareData.splice(index, 1); // Remove card data from comparison
  }

  updateComparisonTable();
}

function updateComparisonTable() {
  var compareContainer = document.getElementById("compare-container");
  compareContainer.innerHTML = ""; // Clear existing comparison table

  if (compareData.length < 2) {
    return;
  }

  var compareBtns = document.querySelectorAll(".card .compare-button");
  compareBtns.forEach(function(btn) {
    btn.disabled = true;
  });

  // Create the table element
  var table = document.createElement("table");
  table.classList.add("comparison-table");
  // table.style.border = "5px solid black";
  table.style.marginTop = "2%";
  table.style.borderRadius = "1%";
  table.style.boxShadow = "0px 0px 9px 0px rgba(0,0,0,0.1)";
  table.style.marginLeft = "2%";
  // Create the table header row
  var columnNames = [
    "plink",
    "title",
    "price",
    "rating",
    "subtitle",
    "inst",
    "tags",
    "link",
  ];
  var propertTitle = [
    "",
    "Name",
    "Price",
    "Rating",
    "Platform",
    "Instructor",
    "Topic",
    "Link",
  ];

  for (var i = 0; i < columnNames.length; i++) {
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    cell1.textContent = propertTitle[i];
    row.appendChild(cell1);

    var propertyName = columnNames[i];
    //console.log(nameofprop);

    var cell2 = document.createElement("td");
    cell2.textContent = compareData[0][propertyName];

    var cell3 = document.createElement("td");
    cell3.textContent = compareData[1][propertyName];

    if (propertyName === "plink") {
      cell2.textContent = "";
      cell3.textContent = "";
      var cell2img = document.createElement("img");
      cell2img.src = compareData[0][propertyName];
      var cell3img = document.createElement("img");
      cell3img.src = compareData[1][propertyName];
      cell2img.style.height = "180px";
      cell2img.style.width = "320px";
      cell3img.style.height = "180px";
      cell3img.style.width = "320px";
      cell2.appendChild(cell2img);
      cell3.appendChild(cell3img);
    }

    if (propertyName === "link") {
      cell2.textContent = "";
      cell3.textContent = "";
      var cell2link = document.createElement("a");
      var cell3link = document.createElement("a");
      cell2link.textContent = "Explore";
      cell3link.textContent = "Explore";
      cell2link.href = compareData[0][propertyName];
      cell3link.href = compareData[1][propertyName];
      cell2link.target = "_blank";
      cell3link.target = "_blank";
      cell2link.setAttribute(
        "style",
        "border: 1px solid black;background-color:#F08519;color:black;border-radius:5px;text-decoration:none;padding:2px;"
      );
      cell3link.setAttribute(
        "style",
        "border: 1px solid black;background-color:#F08519;color:black;border-radius:5px;text-decoration:none;padding:2px;"
      );
      cell2.appendChild(cell2link);
      cell3.appendChild(cell3link);
    }

    row.appendChild(cell2);
    row.appendChild(cell3);

    //css start
    if (i == 0) {
      row.style.backgroundColor = "white";
    }
    else if (i == 1 || i == 3 || i == 5 || i == 7) {
      row.style.backgroundColor = "#eeeeee";
      row.style.border = "2px solid black"
      row.style.boxShadow = "0px 0px 9px 0px rgba(0,0,0,0.1)";
    }
    else if (i == 2 || i == 4 || i == 6) {
      row.style.border = "2px solid black"
      row.style.boxShadow = "0px 0px 9px 0px rgba(0,0,0,0.1)";
    }
    cell1.style.width = "15%";
    cell1.style.padding = "12px 14px 15px";
    cell1.style.fontFamily = "Times-New-Roman";
    cell1.style.fontWeight = "Bold";
    cell2.style.width = "10px";
    cell2.style.padding = "12px 14px 15px";
    cell2.style.fontFamily = "Times-New-Roman";
    cell2.style.fontWeight = "530";
    cell3.style.fontWeight = "530";
    cell3.style.fontFamily = "Times-New-Roman";
    cell3.style.width = "10px";
    cell3.style.padding = "12px 14px 15px"
    //css end

    table.appendChild(row);
  }

  compareContainer.appendChild(table);
  openComparisonPopup();
}

function openComparisonPopup() {
  var compareContainer = document.getElementById("compare-container");
  var popupWindow = window.open("", "Comparison", "width=800,height=600");
  popupWindow.document.write(
    "<html><head><title>Card Comparison</title></head><body></body></html>"
  );

  var fragment = popupWindow.document.createDocumentFragment();
  fragment.appendChild(compareContainer.cloneNode(true));

  popupWindow.document.body.appendChild(fragment);

  popupWindow.onbeforeunload = function() {
    // Reset the "Add to Compare" button for all selected cards
    var compareBtns = document.querySelectorAll(".card .compare-button");
    compareBtns.forEach(function(btn) {
      btn.textContent = "Add to Compare";
      btn.disabled = false;
    });

    compareData = [];
    updateComparisonTable();
  };
}


// Fetch and parse the CSV file
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

    displayCards(data, 12);
    // displayCards(data);
  })
  .catch(function(error) {
    console.log("Error:", error);
  });
