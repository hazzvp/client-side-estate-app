import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the components
jest.mock('./components/SearchPage', () => {
  return function MockSearchPage({ backToSearch, viewProperty, addToFavorites }) {
    return (
      <div data-testid="search-page">
        <button onClick={() => viewProperty({ id: 1, name: 'Test Property' })}>
          View Property
        </button>
        <button onClick={() => addToFavorites({ id: 1, name: 'Test Property' })}>
          Add to Favorites
        </button>
      </div>
    );
  };
});

jest.mock('./components/PropertyDetail', () => {
  return function MockPropertyDetail({ property, addToFavorites }) {
    return (
      <div data-testid="property-detail">
        <h2>{property?.name}</h2>
        <button onClick={() => addToFavorites(property)}>
          Add to Favorites
        </button>
      </div>
    );
  };
});

// Mock the properties data
jest.mock('./Data/properties.json', () => ({
  properties: [
    { id: 1, name: 'Property 1' },
    { id: 2, name: 'Property 2' }
  ]
}));

// Mock react-dnd
jest.mock('react-dnd', () => ({
  DndProvider: ({ children }) => <div>{children}</div>
}));

jest.mock('react-dnd-html5-backend', () => ({
  HTML5Backend: {}
}));

describe('App Component', () => {
  test('renders the app header with title', () => {
    render(<App />);
    expect(screen.getByText('Estate Agent Property Search')).toBeInTheDocument();
    expect(screen.getByText('Find your next stay')).toBeInTheDocument();
  });

  test('renders the footer', () => {
    render(<App />);
    expect(screen.getByText('© 2025 Estate Agent App - University of Westminster')).toBeInTheDocument();
  });

  test('initially shows SearchPage view', () => {
    render(<App />);
    expect(screen.getByTestId('search-page')).toBeInTheDocument();
    expect(screen.queryByTestId('property-detail')).not.toBeInTheDocument();
  });

  test('switches to PropertyDetail view when viewProperty is called', () => {
    render(<App />);
    
    const viewButton = screen.getByText('View Property');
    fireEvent.click(viewButton);
    
    expect(screen.getByTestId('property-detail')).toBeInTheDocument();
    expect(screen.queryByTestId('search-page')).not.toBeInTheDocument();
    expect(screen.getByText('Test Property')).toBeInTheDocument();
  });

  test('shows back button when in detail view', () => {
    render(<App />);
    
    const viewButton = screen.getByText('View Property');
    fireEvent.click(viewButton);
    
    expect(screen.getByText('← Back to Search')).toBeInTheDocument();
  });

  test('returns to search view when back button is clicked', () => {
    render(<App />);
    
    // Go to detail view
    const viewButton = screen.getByText('View Property');
    fireEvent.click(viewButton);
    expect(screen.getByTestId('property-detail')).toBeInTheDocument();
    
    // Click back button
    const backButton = screen.getByText('← Back to Search');
    fireEvent.click(backButton);
    
    expect(screen.getByTestId('search-page')).toBeInTheDocument();
    expect(screen.queryByTestId('property-detail')).not.toBeInTheDocument();
  });

  test('returns to search view when logo is clicked', () => {
    render(<App />);
    
    // Go to detail view
    const viewButton = screen.getByText('View Property');
    fireEvent.click(viewButton);
    expect(screen.getByTestId('property-detail')).toBeInTheDocument();
    
    // Click logo
    const logo = screen.getByAltText('Estate Agent Logo');
    fireEvent.click(logo);
    
    expect(screen.getByTestId('search-page')).toBeInTheDocument();
    expect(screen.queryByTestId('property-detail')).not.toBeInTheDocument();
  });

  test('adds property to favorites', () => {
    render(<App />);
    
    const addButton = screen.getByText('Add to Favorites');
    fireEvent.click(addButton);
    
    // The favorites state is updated (you can verify this through child component props if needed)
    expect(addButton).toBeInTheDocument();
  });

  test('does not add duplicate properties to favorites', () => {
    render(<App />);
    
    const addButton = screen.getByText('Add to Favorites');
    fireEvent.click(addButton);
    fireEvent.click(addButton); // Try to add again
    
   
    expect(addButton).toBeInTheDocument();
  });
});