import React from 'react';
import ImageGallery from './ImageGallery';
import './PropertyDetail.css';

/**
 * PropertyDetail Component
 * Displays full property details with image gallery, map, and floor plan
 */
const PropertyDetail = ({ property, addToFavorites, isFavorite }) => {
  if (!property) {
    return <div>Property not found</div>;
  }

  const formatPrice = (price) => {
    return `Rs ${price.toLocaleString()}`;
  };

   const galleryImages = property.images ? property.images.slice(1) : [];
   
  return (
    <div className="property-detail">
      <div className="detail-container">
        {/* Header */}
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

        {/* Property Info */}
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

       
        <div className="detail-image">
          <img 
            src={`${process.env.PUBLIC_URL}/${property.picture}`} 
            alt={property.location}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
            }}
          />
        </div>

        {galleryImages.length > 0 && (
          <div className="detail-gallery-section">
            <ImageGallery images={galleryImages} />
          </div>
        )}

        <div className="detail-description">
          <h2>Description</h2>
          <p dangerouslySetInnerHTML={{ __html: property.description }}></p>
        </div>

        <div className="detail-map">
          <h2>Location Map</h2>
          <iframe
            title="property-map"
            src={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&output=embed`}
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '12px' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="detail-floorplan">
          <h2>Floor Plan</h2>
          {property.floorPlan ? (
            <img
              src={`${process.env.PUBLIC_URL}/${property.floorPlan}`}
              alt="Floor Plan"
              className="floorplan-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400?text=Floor+Plan+Not+Available';
              }}
            />
          ) : (
            <p>No floor plan available.</p>
          )}
        </div>

        <div className="detail-added">
          <strong>Added:</strong> {property.added.month} {property.added.day}, {property.added.year}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;