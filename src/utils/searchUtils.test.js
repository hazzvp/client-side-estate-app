import { filterProperties, formatPrice } from './searchUtils';

describe('Search Utility Functions', () => {
  
  const mockProperties = [
    { id: 'prop1', type: 'House', price: 45000000, bedrooms: 3 },
    { id: 'prop2', type: 'Flat', price: 28000000, bedrooms: 2 },
    { id: 'prop3', type: 'House', price: 95000000, bedrooms: 5 }
  ];

  test('filters properties by type correctly', () => {
    const criteria = { type: 'house' };
    const result = filterProperties(mockProperties, criteria);
    expect(result).toHaveLength(2);
    expect(result[0].type).toBe('House');
  });

  test('filters properties by price range', () => {
    const criteria = { minPrice: '30000000', maxPrice: '50000000' };
    const result = filterProperties(mockProperties, criteria);
    expect(result).toHaveLength(1);
    expect(result[0].price).toBe(45000000);
  });

  test('filters properties by bedrooms', () => {
    const criteria = { minBedrooms: '3', maxBedrooms: '5' };
    const result = filterProperties(mockProperties, criteria);
    expect(result).toHaveLength(2);
  });

  test('formats price correctly', () => {
    expect(formatPrice(45000000)).toBe('Rs 45,000,000');
    expect(formatPrice(1000000)).toBe('Rs 1,000,000');
  });

  test('returns all properties when no criteria specified', () => {
    const criteria = {};
    const result = filterProperties(mockProperties, criteria);
    expect(result).toHaveLength(3);
  });

});