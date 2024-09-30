"use client"
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ 
  title = 'Reservation requests', 
  Icon = null, 
  iconSize = '2xl', 
  customClasses = '', 
  onClick 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${customClasses} 
       lg:w-full lg:h-44 lg:pl-10 lg:pt-10
      w-50 h-40 pl-3 pt-6
      xs:w-64 xs:h-32 xs:pl-4 xs:pt-4`}
      onClick={onClick} 
      >

      {Icon && <Icon className={`text-${iconSize} text-gray-700`} />}
      {title && (
        <h1 className="mt-5 text-lg font-bold text-gray-800">
          {title}
        </h1>
      )}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  Icon: PropTypes.elementType,
  iconSize: PropTypes.string,
  customClasses: PropTypes.string,
  onClick: PropTypes.func,
};

export default Card;
