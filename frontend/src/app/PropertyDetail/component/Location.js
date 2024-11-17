import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Loading from "../../components/Loader/Loading";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Location = ({ data }) => {
  const location = data?.location || {};
  const locationDetails = data?.locationDetails || {};
  const contactDetails = data?.contactDetails || {};
  const placeTypes = locationDetails?.placesNearby || [];

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const getIcon = (place) => {
    const icons = {
      Restaurant: "🍽️",
      Supermarket: "🛒",
      BusStation: "🚍",
      TrainStation: "🚉",
      Airport: "✈️",
      SkiSlope: "⛷️",
      AquaPark: "🏊",
      TouristTrail: "🥾",
      CycleRoute: "🚴",
      ATM: "🏧",
      GasStation: "⛽",
      ChargingStation: "🔌",
      CableCar: "🚠",
      SwimmingPool: "🏊‍♂️",
      WaterArea: "💧",
      TheSea: "🌊",
      Beach: "🏖️",
      Castle: "🏰",
      Zoo: "🦁",
      Museum: "🏛️",
      BusinessCenter: "🏢",
    };
    return icons[place] || "📍";
  };

  const renderNearbyPlaces = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {placeTypes.map((place, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-xl">{getIcon(place.placeType)}</span>
          <div>
            <p className="text-sm font-medium">{place.placeType}</p>
            <p className="text-xs text-gray-500">{place.distance} km</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-full mx-auto ">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">Location</h2>
          <p className="text-gray-600 mb-6">
            {locationDetails?.country} / {locationDetails?.city} /{" "}
            {locationDetails?.zipCode}
          </p>

          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden mb-6">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: location?.latitude, lng: location?.longitude }}
                zoom={12}
                options={{
                  styles: [
                    {
                      elementType: "labels",
                      featureType: "poi",
                      stylers: [{ visibility: "off" }],
                    },
                  ],
                  disableDefaultUI: true,
                  zoomControl: true,
                }}
              >
                <Marker
                  position={{
                    lat: location?.latitude,
                    lng: location?.longitude,
                  }}
                />
              </GoogleMap>
            ) : (
              <Loading />
            )}
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <h3 className="font-medium">{contactDetails?.host}</h3>
                <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                  {locationDetails?.locationDescription}
                </p>
              </div>
            </div>
          </div>

          {placeTypes.length > 0 && (
            <div className="border-t border-gray-100 mt-6">
              <h3 className="font-medium mt-6 mb-4">Nearby Places</h3>
              {renderNearbyPlaces()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Location;
