import React from 'react';
import './PropertyDetail.css';

const PropertyDetail = ({ property, addToFavorites, isFavorite }) => {
  if (!property) {
    return <div>Property not found</div>;
  }

  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`;
  };

  return (
    <div className="property-detail">
      <div className="detail-container">
        <div className="detail-header">
          <h1>{formatPrice(property.price)}</h1>
          <button
            className={`btn-favorite-detail ${isFavorite ? 'active' : ''}`}
            onClick={() => addToFavorites(property)}
            disabled={isFavorite}
          >
            {isFavorite ? '⭐ Added to Favorites' : '⭐ Add to Favorites'}
          </button>
        </div>

        <div className="detail-location">
          <span className="location-icon">Location</span>
          {property.location}
        </div>

        <div className="detail-main-info">
          <div className="info-badge">
            <span className="badge-icon">Home</span>
            {property.type}
          </div>
          <div className="info-badge">
            <span className="badge-icon">Bedrooms</span>
            {property.bedrooms} Bedrooms
          </div>
          <div className="info-badge">
            <span className="badge-icon">Description</span>
            {property.tenure}
          </div>
        </div>

        <div className="detail-image">
          <img src={property.picture} alt={property.location} />
        </div>

        <div className="detail-description">
          <h2>Description</h2>
          <p dangerouslySetInnerHTML={{ __html: property.description }}></p>
        </div>

        <div className="detail-added">
          <strong>Added:</strong> {property.added.month} {property.added.day}, {property.added.year}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;