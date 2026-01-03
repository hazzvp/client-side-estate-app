import { render, screen, fireEvent } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropertyCard from './PropertyCard';

describe('PropertyCard Component Tests', () => {
  
  const mockProperty = {
    id: 'prop1',
    type: 'House',
    bedrooms: 3,
    price: 45000000,
    location: 'Negombo Road, Negombo',
    picture: 'Images/properties/prop1/image1.jpg',
    description: 'Beautiful house with garden',
    added: { month: 'October', day: 12, year: 2024 }
  };

  const mockAddToFavorites = jest.fn();
  const mockViewProperty = jest.fn();

  const renderWithDnd = (component) => {
    return render(
      <DndProvider backend={HTML5Backend}>
        {component}
      </DndProvider>
    );
  };

  test('renders property information correctly', () => {
    renderWithDnd(
      <PropertyCard
        property={mockProperty}
        addToFavorites={mockAddToFavorites}
        viewProperty={mockViewProperty}
        isFavorite={false}
      />
    );
    
    expect(screen.getByText(/Rs 45,000,000/i)).toBeInTheDocument();
    expect(screen.getByText(/Negombo Road, Negombo/i)).toBeInTheDocument();
    expect(screen.getByText(/House/i)).toBeInTheDocument();
    expect(screen.getByText(/3 beds/i)).toBeInTheDocument();
  });

  test('calls addToFavorites when Add to Favorites button is clicked', () => {
    renderWithDnd(
      <PropertyCard
        property={mockProperty}
        addToFavorites={mockAddToFavorites}
        viewProperty={mockViewProperty}
        isFavorite={false}
      />
    );
    
    const addButton = screen.getByText(/Add to Favorites/i);
    fireEvent.click(addButton);
    
    expect(mockAddToFavorites).toHaveBeenCalledWith(mockProperty);
  });

  test('disables favorite button when property is already favorited', () => {
    renderWithDnd(
      <PropertyCard
        property={mockProperty}
        addToFavorites={mockAddToFavorites}
        viewProperty={mockViewProperty}
        isFavorite={true}
      />
    );
    
    const addButton = screen.getByText(/Added/i);
    expect(addButton).toBeDisabled();
  });

});