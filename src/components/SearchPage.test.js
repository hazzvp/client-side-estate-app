import { render, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchPage from './SearchPage';

describe('SearchPage Component Tests', () => {
  
  const mockProperties = [
    {
      id: 'prop1',
      type: 'House',
      bedrooms: 3,
      price: 45000000,
      location: 'Negombo',
      picture: 'test.jpg',
      description: 'Test property',
      added: { month: 'October', day: 12, year: 2024 }
    }
  ];

  const mockFavorites = [];
  const mockAddToFavorites = jest.fn();
  const mockRemoveFromFavorites = jest.fn();
  const mockClearFavorites = jest.fn();
  const mockViewProperty = jest.fn();

  const renderWithDnd = (component) => {
    return render(
      <DndProvider backend={HTML5Backend}>
        {component}
      </DndProvider>
    );
  };

  test('renders search form and property list', () => {
    renderWithDnd(
      <SearchPage
        properties={mockProperties}
        favorites={mockFavorites}
        addToFavorites={mockAddToFavorites}
        removeFromFavorites={mockRemoveFromFavorites}
        clearFavorites={mockClearFavorites}
        viewProperty={mockViewProperty}
      />
    );
    
    expect(screen.getByText(/Search Properties/i)).toBeInTheDocument();
    expect(screen.getByText(/My Favorites/i)).toBeInTheDocument();
  });

  test('displays correct property count', () => {
    renderWithDnd(
      <SearchPage
        properties={mockProperties}
        favorites={mockFavorites}
        addToFavorites={mockAddToFavorites}
        removeFromFavorites={mockRemoveFromFavorites}
        clearFavorites={mockClearFavorites}
        viewProperty={mockViewProperty}
      />
    );
    
    expect(screen.getByText(/All Properties \(1\)/i)).toBeInTheDocument();
  });

});