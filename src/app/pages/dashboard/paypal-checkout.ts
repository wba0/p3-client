import { environment } from '../../../environments/environment';

declare var paypal: any;

var selectedJob;

export function sendJobInfo (jobInfo){
	selectedJob = jobInfo;
}

export function payPalCheckout(finishedTasks) {
  paypal.Button.render({

    env: 'sandbox', // sandbox | production

    // Show the buyer a 'Pay Now' button in the checkout flow
    commit: true,

    // payment() is called when the button is clicked
    payment: function() {

      // Set up a url on your server to create the payment
      var CREATE_URL = `${environment.apiUrl}/api/paypal/createpayment/${selectedJob._id}`;

      // Make a call to your server to set up the payment
      return paypal.request.post(CREATE_URL)
        .then(function(res) {
          return res.paymentID;
        });
    },

    // onAuthorize() is called when the buyer approves the payment
    onAuthorize: function(data, actions) {
      // Set up a url on your server to execute the payment
      var EXECUTE_URL = `${environment.apiUrl}/api/paypal/executepayment`;

      // Set up the data you need to pass to your server
      var data: any = {
        paymentID: data.paymentID,
        payerID: data.payerID
      };

      // Make a call to your server to execute the payment
      return paypal.request.post(EXECUTE_URL, data)
        .then(finishedTasks);
    }

  }, '#paypal-button-container');
}
