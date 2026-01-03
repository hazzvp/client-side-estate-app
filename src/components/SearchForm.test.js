import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';

describe('SearchForm Component Tests', () => {
  
  const mockOnSearch = jest.fn();
  const mockOnReset = jest.fn();
  const mockSearchCriteria = {
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateFrom: '',
    dateTo: '',
    postcode: ''
  };

  test('renders all form fields', () => {
    render(
      <SearchForm 
        onSearch={mockOnSearch} 
        onReset={mockOnReset}
        searchCriteria={mockSearchCriteria}
      />
    );
    
    expect(screen.getByLabelText(/Property Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Min Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Max Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Min Bedrooms/i)).toBeInTheDocument();
  });

  test('calls onSearch when search button is clicked', () => {
    render(
      <SearchForm 
        onSearch={mockOnSearch} 
        onReset={mockOnReset}
        searchCriteria={mockSearchCriteria}
      />
    );
    
    const searchButton = screen.getByText(/Search Properties/i);
    fireEvent.click(searchButton);
    
    expect(mockOnSearch).toHaveBeenCalled();
  });

  test('calls onReset when reset button is clicked', () => {
    render(
      <SearchForm 
        onSearch={mockOnSearch} 
        onReset={mockOnReset}
        searchCriteria={mockSearchCriteria}
      />
    );
    
    const resetButton = screen.getByText(/Reset/i);
    fireEvent.click(resetButton);
    
    expect(mockOnReset).toHaveBeenCalled();
  });

});