import React, { useState } from 'react';
import './App.css';
import propertiesData from './Data/properties.json';
import SearchPage from './components/SearchPage';
import PropertyDetail from './components/PropertyDetail';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import logo from './logo2.png';

function App() {
  const properties = propertiesData.properties;

  const [currentView, setCurrentView] = useState('search');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (property) => {
    if (!favorites.find(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  const removeFromFavorites = (propertyId) => {
    setFavorites(favorites.filter(fav => fav.id !== propertyId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const viewProperty = (property) => {
    setSelectedProperty(property);
    setCurrentView('detail');
  };

  const backToSearch = () => {
    setCurrentView('search');
    setSelectedProperty(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>

      <div className="App">
        <header className="App-header">
          <div className="header-content">

     
            <img
              src={logo}
              alt="Estate Agent Logo"
              className="app-logo-left"
              onClick={backToSearch}
            />

            
            <div className="header-text">
              <h1>Estate Agent Property Search</h1>
              <h3>Find your next stay</h3>
            </div>

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