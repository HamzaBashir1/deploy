import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Base_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { BiHeart } from 'react-icons/bi';
import { CiLocationOn, CiStar } from 'react-icons/ci';
import { useRouter } from 'next/navigation';

const MapCard = () => {
  const router = useRouter();
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Fetching data using the custom hook
  const { data: accommodationData, loading, error } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation`);

  // Check if data is still loading or if there's an error
  if (loading) return <Loading />;
  if (error) return <Error />;

  // Map properties and extract location (latitude, longitude)
  const properties = accommodationData.map((property) => {
    const { location } = property;
    return {
      ...property,
      latitude: location?.latitude || 0,
      longitude: location?.longitude || 0,
    };
  });

  const onMarkerClick = (property) => {
    setSelectedProperty(property); // Set selected property for the InfoWindow
  };

  const onMapClick = () => {
    setSelectedProperty(null); // Close InfoWindow on map click
  };

  const mapContainerStyle = {
    height: '100%',
    width: '100%',
    marginTop: '60px',
  };

  const handleCardClick = (id) => {
    router.push(`/PropertyDetail/${id}`); // Navigate to the property details page
  };

  // Set the map center to the first property's location if available
  const center = {
    lat: properties.length > 0 ? properties[0].latitude : 0, // Default to first property or 0
    lng: properties.length > 0 ? properties[0].longitude : 0,
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={8}
        onClick={onMapClick}
      >
        {properties.map((property) => (
          <Marker
            key={property._id}
            position={{ lat: property.latitude, lng: property.longitude }}
            onClick={() => onMarkerClick(property)}
          />
        ))}

        {selectedProperty && (
          <InfoWindow
            position={{ lat: selectedProperty.latitude, lng: selectedProperty.longitude }}
            onCloseClick={() => setSelectedProperty(null)}
          >
            <div style={{ position: 'relative', width: '300px', padding: '10px' }}>
              <button
                style={{
                  position: 'absolute',
                  right: '5px',
                  top: '5px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: '#333',
                  zIndex: 1,
                }}
                onClick={() => setSelectedProperty(null)}
              >
                &times;
              </button>

              {/* Card content displayed within the InfoWindow */}
              <div
                className="flex flex-col w-full max-w-xs overflow-hidden border rounded-lg"
                onClick={() => handleCardClick(selectedProperty?._id)}
              >
                <div className="relative w-full h-56">
                  <img
                    src={selectedProperty?.images?.[0] || "/bedroom.jpg"}
                    alt={selectedProperty?.name || "Property"}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 bg-[#00000059] rounded-full p-2">
                    <BiHeart className="text-xl text-[#4FBE9F]" />
                  </div>
                </div>
                <div className="p-3">
                  <h1 className="font-bold text-lg text-[#1F2937]">
                    {selectedProperty?.name || "Unknown Property"}
                  </h1>
                  <p className="text-sm text-[#666666]">
                    {selectedProperty?.description || "No description available"}
                  </p>
                  <div className="flex items-center mt-2">
                    <CiLocationOn className="text-[#292A34]" />
                    <p className="text-sm text-[#292A34] ml-2">
                      {selectedProperty?.location?.address || "Unknown location"}
                    </p>
                  </div>
                  <div className="flex items-center mt-2">
                    <CiStar className="text-[#DC2626]" />
                    <h1 className="ml-1 text-sm font-bold">
                      {selectedProperty?.rating || "N/A"}
                    </h1>
                    <p className="ml-1 text-xs text-gray-600">
                      ({selectedProperty?.reviewsCount || "0"})
                    </p>
                  </div>
                  <h1 className="text-base font-bold mt-2">
                    ${selectedProperty?.price || "N/A"}/night
                  </h1>
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapCard;
