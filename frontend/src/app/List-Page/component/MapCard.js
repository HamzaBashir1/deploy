import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapCard = () => {
  const [properties, setProperties] = useState([]); // State to hold property data
  const [selectedProperty, setSelectedProperty] = useState(null); // State to hold selected property for info window

  // Fetch properties from your API
  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch('/api/properties'); // Update with your API endpoint
      const data = await response.json();
      setProperties(data);
    };
    fetchProperties();
  }, []);

  const onMarkerClick = (property) => {
    setSelectedProperty(property); // Set selected property for the InfoWindow
  };

  const onMapClick = () => {
    setSelectedProperty(null); // Close InfoWindow on map click
  };

  const mapContainerStyle = {
    height: '600px',
    width: '100%',
  };

  const center = {
    lat: properties.length > 0 ? properties[0].latitude : 0, // Default to first property or 0
    lng: properties.length > 0 ? properties[0].longitude : 0,
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"> {/* Use your Google Maps API key */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={8} // Adjust zoom level as needed
        onClick={onMapClick}
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={{ lat: property.latitude, lng: property.longitude }}
            onClick={() => onMarkerClick(property)} // Handle marker click
          />
        ))}

        {selectedProperty && (
          <InfoWindow
            position={{ lat: selectedProperty.latitude, lng: selectedProperty.longitude }}
            onCloseClick={() => setSelectedProperty(null)} // Close InfoWindow
          >
            <div>
              <h2>{selectedProperty.title}</h2>
              <p>{selectedProperty.description}</p>
              <p>Price: {selectedProperty.price} €</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapCard;
