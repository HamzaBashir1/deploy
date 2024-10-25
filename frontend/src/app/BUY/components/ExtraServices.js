"use client";
import React from 'react';

function ExtraServices() {
  const Card = ({ title, location, price, image }) => (
    <div className="border rounded-lg shadow-lg w-full sm:w-60 md:w-72 lg:w-80 h-full overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="object-cover w-full h-40 sm:h-48 md:h-52 lg:h-48" 
      />
      <div className="p-4">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-500">{location}</p>
        <div className="mt-4">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-red-500">{price}</span> / night
        </div>
      </div>
    </div>
  );
      
  return (
    <div>
      <div className="container px-4 py-12 mx-auto">
        <h1 className="mb-6 text-3xl md:text-4xl font-bold text-center">Extra Services</h1>
        <p className="mb-8 text-center text-gray-600 mx-auto max-w-3xl">
          Use the potential of your accommodation <b>to the maximum</b> and try extra
          services that will enable you not only to highlight your offer, but also
          to get higher in the search results. This way, you will significantly
          increase the number of its views and the number of bookings, which means
          - higher revenues.
        </p>

        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-1">
            <h2 className="mb-4 text-2xl font-bold">Special Prices and Discounts</h2>
            <p className="text-gray-600 md:mr-20">
              Set discounted prices for long stays, for early bookings, or just a
              reduced price for any period from – to. The highlighted discounted
              price is then displayed in search results and in the accommodation
              detail itself in an expanded form.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 lg:gap-6 justify-center">
            <Card
              title="The Lounge & Bar"
              location="2 guests, 1 bedroom - 2 beds"
              price="$511"
              image="/Pieniny.png"
            />
            <Card
              title="The Lounge & Bar"
              location="2 guests, 1 bedroom - 2 beds"
              price="$511"
              image="/Pieniny.png"
            />
          </div>
        </div>
      </div>

      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col md:flex-row-reverse items-start gap-8">
          <div className="flex-1">
            <h2 className="mb-4 text-2xl font-bold">Top</h2>
            <p className="text-gray-600 md:mr-20">
              With the Top service, your accommodation will not only be highlighted 
              compared to regular offers, but will also appear higher in the search 
              results. Combined with the promotional price service, your offer will 
              be much more attractive than usual.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 lg:gap-6 justify-center">
            <Card
              title="The Lounge & Bar"
              location="2 guests, 1 bedroom - 2 beds"
              price="$511"
              image="/Pieniny.png"
            />
            <Card
              title="The Lounge & Bar"
              location="2 guests, 1 bedroom - 2 beds"
              price="$511"
              image="/Pieniny.png"
            />
          </div>
        </div>
      </div>

      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-1">
            <h2 className="mb-4 text-2xl font-bold">Premium</h2>
            <p className="text-gray-600 md:mr-20">
              Maximize your returns. Premium will get you to the very first positions 
              in the search results. This service is limited, so only a certain number 
              of accommodations can have it active.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 lg:gap-6 justify-center">
            <Card
              title="The Lounge & Bar"
              location="2 guests, 1 bedroom - 2 beds"
              price="$511"
              image="/Pieniny.png"
            />
            <Card
              title="The Lounge & Bar"
              location="2 guests, 1 bedroom - 2 beds"
              price="$511"
              image="/Pieniny.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExtraServices;
