import React from 'react';
import ImageGallery from './ImageGallery';
import './PropertyDetail.css';

/**
 * PropertyDetail Component
 * Displays full property details with image gallery
 */
const PropertyDetail = ({ property, addToFavorites, isFavorite }) => {
  if (!property) {
    return <div>Property not found</div>;
  }

  const formatPrice = (price) => {
    return `Rs ${price.toLocaleString()}`;
  };

  return (
    <div className="property-detail">
      <div className="detail-container">
        {/* Header with Price and Favorite Button */}
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

        {/* Location */}
        <div className="detail-location">
          <span className="location-icon">📍</span>
          {property.location}
        </div>

        {/* Property Info Badges */}
        <div className="detail-main-info">
          <div className="info-badge">
            <span className="badge-icon">🏠</span>
            {property.type}
          </div>
          <div className="info-badge">
            <span className="badge-icon">🛏️</span>
            {property.bedrooms} Bedrooms
          </div>
          <div className="info-badge">
            <span className="badge-icon">📋</span>
            {property.tenure}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="detail-gallery">
          <h2>Gallery</h2>
          <ImageGallery images={property.images} />
        </div>

        {/* Description */}
        <div className="detail-description">
          <h2>Description</h2>
          <p dangerouslySetInnerHTML={{ __html: property.description }}></p>
        </div>

        {/* Date Added */}
        <div className="detail-added">
          <strong>Added:</strong> {property.added.month} {property.added.day}, {property.added.year}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;