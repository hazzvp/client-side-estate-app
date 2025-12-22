import React, { useState } from 'react';
import './SearchForm.css';

/**
 * SearchForm Component
 * Form with React-enhanced inputs for property search
 */
const SearchForm = ({ onSearch, onReset, searchCriteria }) => {
  const [formData, setFormData] = useState(searchCriteria);

  /**
   * Handle input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  /**
   * Handle reset
   */
  const handleReset = () => {
    const emptyForm = {
      type: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateFrom: '',
      dateTo: '',
      postcode: ''
    };
    setFormData(emptyForm);
    onReset();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        {/* Property Type */}
        <div className="form-group">
          <label htmlFor="type">Property Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Any</option>
            <option value="house">House</option>
            <option value="flat">Flat</option>
          </select>
        </div>

        {/* Min Price */}
        <div className="form-group">
          <label htmlFor="minPrice">Min Price (£)</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={formData.minPrice}
            onChange={handleChange}
            placeholder="0"
            min="0"
            step="1000"
            className="form-input"
          />
        </div>

        {/* Max Price */}
        <div className="form-group">
          <label htmlFor="maxPrice">Max Price (£)</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={formData.maxPrice}
            onChange={handleChange}
            placeholder="2000000"
            min="0"
            step="1000"
            className="form-input"
          />
        </div>

        {/* Min Bedrooms */}
        <div className="form-group">
          <label htmlFor="minBedrooms">Min Bedrooms</label>
          <input
            type="number"
            id="minBedrooms"
            name="minBedrooms"
            value={formData.minBedrooms}
            onChange={handleChange}
            placeholder="1"
            min="1"
            max="10"
            className="form-input"
          />
        </div>

        {/* Max Bedrooms */}
        <div className="form-group">
          <label htmlFor="maxBedrooms">Max Bedrooms</label>
          <input
            type="number"
            id="maxBedrooms"
            name="maxBedrooms"
            value={formData.maxBedrooms}
            onChange={handleChange}
            placeholder="6"
            min="1"
            max="10"
            className="form-input"
          />
        </div>

        {/* Date From */}
        <div className="form-group">
          <label htmlFor="dateFrom">Date Added From</label>
          <input
            type="date"
            id="dateFrom"
            name="dateFrom"
            value={formData.dateFrom}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Date To */}
        <div className="form-group">
          <label htmlFor="dateTo">Date Added To</label>
          <input
            type="date"
            id="dateTo"
            name="dateTo"
            value={formData.dateTo}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Postcode */}
        <div className="form-group">
          <label htmlFor="postcode">Postcode Area</label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            placeholder="e.g. BR1, BR2"
            className="form-input"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          🔍 Search Properties
        </button>
        <button type="button" onClick={handleReset} className="btn btn-secondary">
          🔄 Reset
        </button>
      </div>
    </form>
  );
};

export default SearchForm;