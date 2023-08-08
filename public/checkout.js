

Stripe.setPublishableKey(
  "pk_test_51NZhfRKzyoAtD1JuuL2iIhuPdrtQKBOeak9gGuNgZE56Guyue3MtmIYHmeqdfpuPIxNx7AAZw51jh0OuPH2FBIxK00W8GbbcNP"
);

let $form = $("#checkout-form");

$form.submit(function (event) { 
  console.log('paymeny')
  $form.find("button").prop("disabled", true);
  $('#payment-errors').addClass('d-none')


  
  Stripe.card.createToken(
    {
      number: $(".card-number").val(),
      cvc: $(".card-cvc").val(),
      exp_month: $(".card-expiry-month").val(),
      exp_year: $(".card-expiry-year").val(),
    },
    stripeResponseHandler
  );
  return false
});


function stripeResponseHandler(status, response) {

  // Grab the form:

  if (response.error) { // Problem!
    console.log('paymeny')

    // Show the errors on the form
    $('#payment-errors').text(response.error.message);
    $('#payment-errors').removeClass('d-none')
    $form.find("button").prop("disabled", false);



  } else { // Token was created!

    // Get the token ID:
    var token = response.id;

    // Insert the token into the form so it gets submitted to the server:
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));

    // Submit the form:
    $form.get(0).submit();

  }
}