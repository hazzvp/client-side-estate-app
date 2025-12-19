import React, { useState } from 'react';
import './App.css';
import propertiesData from './Data/properties.json';
import SearchPage from './components/SearchPage';
import PropertyDetail from './components/PropertyDetail';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

/**
 * Main App Component
 * Manages routing between search page and property details
 * Handles favorites state management
 */
function App() {
  // Extract properties array from the imported JSON
  const properties = propertiesData.properties;

  // State to track current view (search or property detail)
  const [currentView, setCurrentView] = useState('search');
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // State to manage favorite properties
  const [favorites, setFavorites] = useState([]);

  /**
   * Add property to favorites list
   * Prevents duplicates
   */
  const addToFavorites = (property) => {
    if (!favorites.find(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  /**
   * Remove property from favorites list
   */
  const removeFromFavorites = (propertyId) => {
    setFavorites(favorites.filter(fav => fav.id !== propertyId));
  };

  /**
   * Clear all favorites
   */
  const clearFavorites = () => {
    setFavorites([]);
  };

  /**
   * Navigate to property detail page
   */
  const viewProperty = (property) => {
    setSelectedProperty(property);
    setCurrentView('detail');
  };

  /**
   * Navigate back to search page
   */
  const backToSearch = () => {
    setCurrentView('search');
    setSelectedProperty(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <h1>🏡 Estate Agent Property Search</h1>
            {currentView === 'detail' && (
              <button onClick={backToSearch} className="back-button">
                ← Back to Search
              </button>
            )}
          </div>
        </header>

        <main className="App-main">
          {currentView === 'search' ? (
            <SearchPage
              properties={properties}
              favorites={favorites}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              clearFavorites={clearFavorites}
              viewProperty={viewProperty}
            />
          ) : (
            <PropertyDetail
              property={selectedProperty}
              addToFavorites={addToFavorites}
              isFavorite={favorites.some(fav => fav.id === selectedProperty?.id)}
            />
          )}
        </main>

        <footer className="App-footer">
          <p>© 2025 Estate Agent App - University of Westminster</p>
        </footer>
      </div>
    </DndProvider>
  );
}

export default App;