"use client"
import React from 'react'

function ExtraServices() {
    const Card = ({ title, location, price, image }) => (
        <div className="overflow-hidden border rounded-lg shadow-lg lg:h-80 lg:w-80 w-40 h-80">
          <img src={image} alt={title} className="lg:object-cover w-50 h-50 lg:w-full lg:h-48" />
          <div className="p-4">
            <h2 className="lg:text-lg text-[15px]  font-bold">{title}</h2>
            <p className="lg:text-sm text-[10px] text-gray-500">{location}</p>
            <div className="mt-4">
              <span className="lg:text-xl text-[18px] font-bold text-red-500">{price}</span> / night
            </div>
          </div>
        </div>
      );
      
  return (
    <div>
    <div className="container p-6 lg:mx-auto">
  <h1 className="mb-6 text-4xl font-bold text-center">Extra Services</h1>
  <p className="mb-8 text-center text-gray-600 mx-auto max-w-3xl">
    Use the potential of your accommodation <b>  to the maximum </b>  and try extra
    services that will enable you not only to highlight your offer, but also
    to get higher in the search results. This way, you will significantly
    increase the number of its views and the number of bookings, which means
    - higher revenues.
  </p>

  <div className="flex flex-col  md:flex-row items-start gap-8">
    {/* Title and Description Section */}
    <div className="flex-1">
      <h2 className="mb-4 text-[30px] font-bold">Special Prices and<br/> Discounts</h2>
      <p className="text-gray-600 mr-0 md:mr-28">
        Set discounted prices for long stays, for early bookings, or just a
        reduced price for any period from – to. The highlighted discounted
        price is then displayed in search results and in the accommodation
        detail itself in an expanded form.
      </p>
    </div>

    {/* Cards Section */}
    <div className="flex flex-row ml-10  md:flex-row lg:gap-6 gap-3">
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

<div className="container p-6 mx-auto">
<h1 className="mb-6 text-2xl font-bold text-center"></h1>
<p className="mb-8 text-center text-gray-600 mx-auto max-w-3xl">
  
</p>

<div className="flex flex-col-reverse lg:flex-1 md:flex-row items-start gap-8">
  {/* Cards Section */}
  <div className="flex flex-row ml-10  md:flex-row lg:gap-6 gap-3">
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

  {/* Title and Description Section */}
  <div className=" flex-col">
    <h2 className="mb-4 text-xl font-semibold">Top</h2>
    <p className="text-gray-600 md:mr-28">
      With the Top service, your accommodation will not only
      be highlighted compared to regular offers, but will also
      appear higher in the search results. When combined
      with the promotional price service, your offer will be
      much more attractive than the usual ones.
    </p>
  </div>
</div>
</div>

<div className="container p-6 mx-auto">
<h1 className="mb-6 text-2xl font-bold text-center"></h1>
<p className="mb-8 text-center text-gray-600 mx-auto max-w-3xl">
  
</p>

<div className="flex flex-col md:flex-row items-start gap-8">
  {/* Title and Description Section */}
  <div className="flex-1">
    <h2 className="mb-4 text-xl font-semibold">Premium</h2>
    <p className="text-gray-600 md:mr-28">
      Maximize your returns. Premium will get you to the very
      first positions in the search results. This service is
      limited, so only a certain number of accommodations
      can have it active.
    </p>
  </div>

  {/* Cards Section */}
  <div className="flex flex-row ml-10  md:flex-row lg:gap-6 gap-3">
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
  )
}

export default ExtraServices
