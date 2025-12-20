import React from 'react';
import { useDrop } from 'react-dnd';
import './FavoritesList.css';

const FavoritesList = ({
  favorites,
  removeFromFavorites,
  clearFavorites,
  viewProperty
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PROPERTY',
    drop: (item) => {
     
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`;
  };

  return (
    <div className="favorites-list">
      <div className="favorites-header">
        <h3>⭐ My Favorites ({favorites.length})</h3>
      </div>

      <div
        ref={drop}
        className={`favorites-drop-zone ${isOver ? 'drag-over' : ''}`}
      >
        {favorites.length === 0 ? (
          <div className="drop-zone-empty">
            <div className="drop-icon">🎯</div>
            <p>Drag properties here</p>
            <p className="drop-hint">or click ⭐ button</p>
          </div>
        ) : (
          <div className="favorites-items">
            {favorites.map(property => (
              <div key={property.id} className="favorite-item">
                <div 
                  className="favorite-content"
                  onClick={() => viewProperty(property)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="favorite-image">
                    <img src={property.picture} alt={property.location} />
                  </div>
                  <div className="favorite-info">
                    <h4>{formatPrice(property.price)}</h4>
                    <p className="favorite-location">{property.location.split(',')[0]}</p>
                    <p className="favorite-details">
                      {property.bedrooms} bed {property.type}
                    </p>
                  </div>
                </div>
                <button
                  className="btn-remove"
                  onClick={() => removeFromFavorites(property.id)}
                  title="Remove from favorites"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {favorites.length > 0 && (
        <button className="btn-clear-all" onClick={clearFavorites}>
          🗑️ Clear All Favorites
        </button>
      )}
    </div>
  );
};

export default FavoritesList;