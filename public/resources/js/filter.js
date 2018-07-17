var list = document.querySelector("#productList");
var searchBar = document.forms["prodSearchForm"].querySelector("input");

//Attach an event listener to the search bar
searchBar.addEventListener("keyup", function(e) {
  var term = e.target.value.toLowerCase();
  var products = list.getElementsByTagName("li");

  //Make an array of the list of products and compare them
  Array.from(products).forEach(function(product) {
    //Get the name of each product
    var name = product.firstElementChild.firstElementChild.textContent;

    //Compare the lowercase search term to the lowercase product
    if (name.toLowerCase().indexOf(term) != -1) {
      product.classList.add("d-flex");
    } else {
      product.classList.remove("d-flex");
      product.style.display = "none";
    }
  });
});
