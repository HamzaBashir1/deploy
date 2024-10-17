import React from 'react';

const Payments = ({ data }) => {
  const deposit = data?.deposit || "N/A";

  return (
    <>
      <h3 className="text-2xl font-bold mb-4">Payments</h3>
      <ul className="list-disc pl-5 mb-2">
        <li>Deposit: 50% of the price of the stay</li>
        <li>Deposit: €{deposit}</li> {/* Use the dynamic deposit value here */}
        <li>Recreation fee: €1 / person, night</li>
      </ul>
      <h4 className="text-lg font-bold mt-4 mb-2">Additional information</h4>
      <p className="mb-2">
        Christmas stay and New Year's Eve require a 100% deposit, which must be paid by 1/12/2024. After 1/12/2024, cancellation is not possible.
      </p>
      <h4 className="text-lg font-bold mt-4 mb-2">The price includes:</h4>
      <ul className="list-disc pl-5 mb-2">
        <li>WiFi internet</li>
        <li>Parking</li>
        <li>Bed linen</li>
        <li>Towels</li>
        <li>Wood for the fireplace</li>
        <li>Electricity consumption</li>
        <li>Outdoor pool in season</li>
        <li>Indoor hydromassage whirlpool</li>
      </ul>
    </>
  );
};

export default Payments;
