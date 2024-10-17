import React from 'react';

const RulesOfStay = ({ data }) => {
  const arrivalAndDeparture = data?.arrivalAndDeparture || {};
  const checkinCheckoutProcess = data?.checkinCheckoutProcess || "N/A";
  const wifi = data?.wifi || "N/A";
  const diet = data?.diet || "N/A";
  const smoking = data?.smoking || "N/A";
  const pets = data?.pets || "N/A";
  const loudMusic = data?.loudMusic || "N/A";
  const parking = data?.parking || "N/A"; 

  return (
    <>
      <h4 className="text-lg font-bold mb-2">Rules of Stay</h4>
      <p className="mb-2">Please respect the rules of stay during your visit.</p>
      <ul className="list-disc pl-5 mb-2">
        <li>
          Check-in from {arrivalAndDeparture?.arrivalFrom || "N/A"} to {arrivalAndDeparture?.arrivalTo || "N/A"}
        </li>
        <li>
          Check-out from {arrivalAndDeparture?.departureFrom || "N/A"} to {arrivalAndDeparture?.departureTo || "N/A"}
        </li>
        <li>Accommodation process: {checkinCheckoutProcess}</li>
        <li>Wifi: {wifi}</li>
        <li>Meals: {diet}</li>
        <li>Parking: {parking}</li>
        <li>Smoking: {smoking}</li>
        <li>Pets: {pets}</li>
        <li>Loud music: {loudMusic}</li>
      </ul>
    </>
  );
};

export default RulesOfStay;
