document.addEventListener('DOMContentLoaded', function () {
    var paymentForm = document.getElementById('payment-form');
    var paymentMethodSelect = document.getElementById('payment-method');
    var upiOptions = document.getElementById('upi-options');
    var debitCardOptions = document.getElementById('debit-card-options');

    paymentMethodSelect.addEventListener('change', function () {
        var selectedMethod = paymentMethodSelect.value;

        // Hide all options
        upiOptions.style.display = 'none';
        debitCardOptions.style.display = 'none';

        // Show the selected option
        if (selectedMethod === 'upi') {
            upiOptions.style.display = 'block';
        } else if (selectedMethod === 'debit-card') {
            debitCardOptions.style.display = 'block';
        }
    });

    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Perform payment processing here (for demonstration purposes)
        alert('Payment Successful!');
    });
});