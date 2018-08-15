$(document).on("click", ".openViewModal", function() {
  var modalAction = $(this).data("op");
  $(".modal-footer a").attr("href", modalAction);
});
