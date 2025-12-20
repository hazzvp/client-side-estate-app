import React from 'react';
import PropertyCard from './PropertyCard';
import './PropertyList.css';

const PropertyList = ({ properties, addToFavorites, viewProperty, favorites }) => {
  if (properties.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">🔍</div>
        <h3>No properties found</h3>
        <p>Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="property-list">
      {properties.map(property => (
        <PropertyCard
          key={property.id}
          property={property}
          addToFavorites={addToFavorites}
          viewProperty={viewProperty}
          isFavorite={favorites.some(fav => fav.id === property.id)}
        />
      ))}
    </div>
  );
};

export default PropertyList;