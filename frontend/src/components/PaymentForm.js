import React, { useState } from 'react';

const PaymentForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(parseFloat(amount));
  };

  return (
    <div>
      <h2>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input type="number" value={amount} onChange={handleAmountChange} />
        </label>
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default PaymentForm;
