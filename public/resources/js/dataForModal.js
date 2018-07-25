$(document).on("click", ".openViewModal", function() {
  var orderAction = $(this).data("order");
  $(".modal-footer a").attr("href", "/orders" + orderAction);
});
