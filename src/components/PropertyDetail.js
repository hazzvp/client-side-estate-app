import React from 'react';
import './PropertyDetail.css';

/**
 * PropertyDetail Component (Basic version)
 * Will be enhanced with tabs and gallery later
 */
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
          <span className="location-icon">📍</span>
          {property.location}
        </div>

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
        <div className="detail-image">
        <img src={property.picture} alt={property.location} />
        </div>
            {/* Image Gallery */}
        <div className="detail-gallery">
        <h2>Gallery</h2>
        <div className="gallery-grid">
            {property.images && property.images.map((img, index) => (
            <img
                key={index}
                src={img}
                alt={`Property view ${index + 1}`}
            />
            ))}
        </div>
        </div>


        <div className="detail-description">
          <h2>Description</h2>
          <p dangerouslySetInnerHTML={{ __html: property.description }}></p>
        </div>

        <div>
            <div className="detail-map">
                <h2>Location Map</h2>
                <iframe
                    title="property-map"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                    property.location
                    )}&output=embed`}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                </div>

        </div>

        <div className="detail-floorplan">
        <h2>Floor Plan</h2>
        {property.floorPlan ? (
            <img
            src={property.floorPlan}
            alt="Floor Plan"
            className="floorplan-image"
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