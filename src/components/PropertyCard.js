import React from 'react';
import { useDrag } from 'react-dnd';
import './PropertyCard.css';

/**
 * PropertyCard Component
 * Individual property card with drag functionality
 */
const PropertyCard = ({ property, addToFavorites, viewProperty, isFavorite }) => {
  // Drag functionality for adding to favorites
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROPERTY',
    item: property,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  /**
   * Format price with commas
   */
  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`;
  };

  /**
   * Format date for display
   */
  const formatDate = (added) => {
    return `${added.month.substring(0, 3)} ${added.day}, ${added.year}`;
  };

  /**
   * Extract postcode from location
   */
  const getPostcode = (location) => {
    const match = location.match(/([A-Z]{1,2}\d{1,2})/);
    return match ? match[0] : '';
  };

  return (
    <div
      ref={drag}
      className={`property-card ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {/* Property Image */}
      <div 
        className="property-image" 
        onClick={() => viewProperty(property)}
        style={{ cursor: 'pointer' }}
        
      >
        <img 
  src={`${process.env.PUBLIC_URL}/${property.picture}`} 
  alt={property.location}
  onError={(e) => {
    console.error('Image failed to load:', property.picture);
    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
  }}
/>
        <img src={property.picture} alt={property.location} />
        {isFavorite && (
          <div className="favorite-badge">⭐ Favorite</div>
        )}
      </div>

      {/* Property Content */}
      <div className="property-content">
        <div className="property-price">{formatPrice(property.price)}</div>
        <div className="property-location">📍 {property.location}</div>
        
        <div className="property-description">
          {property.description.substring(0, 100)}...
        </div>

        {/* Property Details */}
        <div className="property-details">
          <div className="property-detail-item">
            <span className="detail-icon">🏠</span>
            <span>{property.type}</span>
          </div>
          <div className="property-detail-item">
            <span className="detail-icon">🛏️</span>
            <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="property-detail-item">
            <span className="detail-icon">📅</span>
            <span>{formatDate(property.added)}</span>
          </div>
        </div>

        {/* Postcode Badge */}
        {getPostcode(property.location) && (
          <div className="postcode-badge">{getPostcode(property.location)}</div>
        )}

        {/* Actions */}
        <div className="property-actions">
          <button
            className="btn-view"
            onClick={() => viewProperty(property)}
          >
            👁️ View Details
          </button>
          <button
            className={`btn-favorite ${isFavorite ? 'active' : ''}`}
            onClick={() => addToFavorites(property)}
            disabled={isFavorite}
          >
            {isFavorite ? '⭐ Added' : '⭐ Add to Favorites'}
          </button>
        </div>

        {/* Drag Hint */}
        <div className="drag-hint">
          💡 Drag to favorites or click button
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;