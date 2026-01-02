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
     
      if (!favorites.find(fav => fav.id === item.id)) {
        
      }
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
        <h3>My Favorites ({favorites.length})</h3>
      </div>

      <div
        ref={drop}
        className={`favorites-drop-zone ${isOver ? 'drag-over' : ''}`}
      >
        {favorites.length === 0 ? (
            <div className="drop-zone-empty">
            <p>No saved properties</p>
            <p className="drop-hint">Click "Add to Favorites" to save properties here</p>
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
                    <img 
                        src={`${process.env.PUBLIC_URL}/${property.picture}`} 
                        alt={property.location} 
                    />
                    </div>
                  <div className="favorite-info">
                    <h4>{formatPrice(property.price)}</h4>
                    <p className="favorite-location">{property.location.split(',')[0]}</p>
                    <p className="favorite-details">
                      {property.bedrooms} bed {property.type}
                    </p>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>

      {favorites.length > 0 && (
        <button className="btn-clear-all" onClick={clearFavorites}>
          Clear All Favorites
        </button>
      )}
    </div>
  );
};

export default FavoritesList;