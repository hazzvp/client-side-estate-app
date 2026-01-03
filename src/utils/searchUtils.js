export const filterProperties = (properties, criteria) => {
  return properties.filter(property => {
 
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

    return true;
  });
};

export const formatPrice = (price) => {
  return `Rs ${price.toLocaleString()}`;
};