import React from 'react';

const Surcharges = ({ data }) => {
  const contactDetails = data?.contactDetails || {};

  return (
    <>
      <h3 className="text-2xl font-bold mb-4">Surcharges</h3>
      {/* <ul className="list-disc pl-5 mb-2">
        <li>SAUNA: €8/hour</li>
      </ul> */}
      <h4 className="text-lg font-bold mt-4 mb-2">Additional information</h4>
      <p className="mb-2">
        {contactDetails?.additionalContactInfo}
      </p>
    </>
  );
};

export default Surcharges;
