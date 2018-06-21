var list = document.querySelector('#productList');
var searchBar = document.forms['prodSearchForm'].querySelector('input');

searchBar.addEventListener('keyup', function (e) {
  var term = e.target.value.toLowerCase();
  var products = list.getElementsByTagName('li');
  
  Array.from(products).forEach(function (product) {
    var name = product.firstElementChild.firstElementChild.textContent;
    if (name.toLowerCase().indexOf(term) != -1) {
      product.classList.add('d-flex');
    } else {
      product.classList.remove('d-flex');
      product.style.display = 'none';
    }
  });
});
