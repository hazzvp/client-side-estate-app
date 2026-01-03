import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component Tests', () => {
  
  test('renders Estate Agent header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Estate Agent Property Search/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders search page by default', () => {
    render(<App />);
    const searchElement = screen.getByText(/Search Properties/i);
    expect(searchElement).toBeInTheDocument();
  });

  test('displays all properties on load', () => {
    render(<App />);
    const allPropertiesText = screen.getByText(/All Properties \(7\)/i);
    expect(allPropertiesText).toBeInTheDocument();
  });

});