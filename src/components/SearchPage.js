import React, { useState } from 'react';
import SearchForm from './SearchForm';
import PropertyList from './PropertyList';
import FavoritesList from './FavoritesList';
import './SearchPage.css';


const SearchPage = ({
  properties,
  favorites,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  viewProperty
}) => {
  
  const [searchCriteria, setSearchCriteria] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateFrom: '',
    dateTo: '',
    postcode: ''
  });

  
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [hasSearched, setHasSearched] = useState(false);

  
  const getPropertyDate = (added) => {
    const monthMap = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return new Date(added.year, monthMap[added.month], added.day);
  };

  
  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
    setHasSearched(true);

    const filtered = properties.filter(property => {
      
      if (criteria.type && criteria.type !== 'any') {
        if (property.type.toLowerCase() !== criteria.type.toLowerCase()) {
          return false;
        }
      }

  
      if (criteria.minPrice && property.price < parseFloat(criteria.minPrice)) {
        return false;
      }
      if (criteria.maxPrice && property.price > parseFloat(criteria.maxPrice)) {
        return false;
      }

    
      if (criteria.minBedrooms && property.bedrooms < parseInt(criteria.minBedrooms)) {
        return false;
      }
      if (criteria.maxBedrooms && property.bedrooms > parseInt(criteria.maxBedrooms)) {
        return false;
      }

    
      if (criteria.dateFrom || criteria.dateTo) {
        const propertyDate = getPropertyDate(property.added);
        
        if (criteria.dateFrom) {
          const fromDate = new Date(criteria.dateFrom);
          if (propertyDate < fromDate) {
            return false;
          }
        }
        
        if (criteria.dateTo) {
          const toDate = new Date(criteria.dateTo);
          if (propertyDate > toDate) {
            return false;
          }
        }
      }

     
      if (criteria.postcode) {
        const locationUpper = property.location.toUpperCase();
        const postcodeUpper = criteria.postcode.toUpperCase();
        if (!locationUpper.includes(postcodeUpper)) {
          return false;
        }
      }

      return true;
    });

    setFilteredProperties(filtered);
  };

 
  const handleReset = () => {
    setSearchCriteria({
      type: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateFrom: '',
      dateTo: '',
      postcode: ''
    });
    setFilteredProperties(properties);
    setHasSearched(false);
  };

  return (
    <div className="search-page">
      
      <section className="search-section">
        <h2>Search Properties</h2>
        <SearchForm
          onSearch={handleSearch}
          onReset={handleReset}
          searchCriteria={searchCriteria}
        />
      </section>

     
      <div className="content-grid">
        
        <section className="results-section">
          <div className="results-header">
            <h2>
              {hasSearched
                ? `Found ${filteredProperties.length} ${filteredProperties.length === 1 ? 'Property' : 'Properties'}`
                : `All Properties (${properties.length})`}
            </h2>
          </div>
          <PropertyList
            properties={filteredProperties}
            addToFavorites={addToFavorites}
            viewProperty={viewProperty}
            favorites={favorites}
          />
        </section>

        
        <aside className="favorites-section">
          <FavoritesList
            favorites={favorites}
            removeFromFavorites={removeFromFavorites}
            clearFavorites={clearFavorites}
            viewProperty={viewProperty}
          />
        </aside>
      </div>
    </div>
  );
};

export default SearchPage;