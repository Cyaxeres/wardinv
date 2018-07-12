$(document).on("click", ".openViewModal", function () {
  var orderId = $(this).data('order');
  console.log(orderId);
  $(".modal-footer a").attr('href', '/orders/' + orderId);
});
