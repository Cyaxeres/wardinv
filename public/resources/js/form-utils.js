//when unit is 'single', the quantity per unit field should be disabled and the value should remain one
$('#unitq').prop("disabled", true);
$('#expdate').prop("min", `${new Date(new Date().setDate(new Date().getDate()+1)).toISOString().slice(0,10)}`);

$(document).ready(function () {
  var unitBtn = $('#btn-pack, #btn-pounds');
  $('#btn-single').on('click', function () {
    $('#unitq').prop("readonly", true);
    $('#unitq').prop("disabled", false);
    $('#unitq').prop("value", 1);
  });

  $(unitBtn).on('click', function () {
    $('#unitq').prop("disabled", false);
    $('#unitq').prop("readonly", false);
  })
});
