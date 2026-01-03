import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './PropertyDetail.css';


const PropertyDetail = ({ property, addToFavorites, isFavorite }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) {
    return <div>Property not found</div>;
  }

  const propNumber = property.id.replace('prop', '');
  const TOTAL_IMAGES = 7;

  const getCurrentImagePath = () => {
    if (currentImageIndex === 0) {
      return `Images/properties/prop${propNumber}/image${propNumber}.jpg`;
    } else {
      return `Images/properties/prop${propNumber}/img${propNumber}-${currentImageIndex}.jpg`;
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev < TOTAL_IMAGES - 1 ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev > 0 ? prev - 1 : TOTAL_IMAGES - 1
    );
  };

  const formatPrice = (price) => {
    return `Rs ${price.toLocaleString()}`;
  };

  const currentImagePath = getCurrentImagePath();

  return (
    <div className="property-detail">
      <div className="detail-container">
        
        <div className="detail-header">
          <h1>{formatPrice(property.price)}</h1>
          <button
            className={`btn-favorite-detail ${isFavorite ? 'active' : ''}`}
            onClick={() => addToFavorites(property)}
            disabled={isFavorite}
          >
            {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
          </button>
        </div>

      
        <div className="detail-location">
          
          {property.location}
        </div>

        
        <div className="detail-main-info">
          <div className="info-badge">
            <span className="badge-icon"></span>
            {property.type}
          </div>
          <div className="info-badge">
            <span className="badge-icon"></span>
            {property.bedrooms} Bedrooms
          </div>
          <div className="info-badge">
            <span className="badge-icon"></span>
            {property.tenure}
          </div>
        </div>

       
        <div className="detail-image-container">
          <h2>Property Images</h2>
          <div className="detail-main-image">
            <img 
              src={`${process.env.PUBLIC_URL}/${currentImagePath}`}
              alt={`Property view ${currentImageIndex + 1}`}
              onError={(e) => {
                console.error('Failed to load:', currentImagePath);
                e.target.src = 'https://via.placeholder.com/1200x800?text=Image+Not+Found';
              }}
            />
            
           
            <button 
              className="image-nav-arrow image-nav-left" 
              onClick={prevImage}
              aria-label="Previous image"
            >
              ❮
            </button>
            <button 
              className="image-nav-arrow image-nav-right" 
              onClick={nextImage}
              aria-label="Next image"
            >
              ❯
            </button>

            
            <div className="image-counter">
              {currentImageIndex + 1} / {TOTAL_IMAGES}
            </div>
          </div>
        </div>

        <div className="detail-tabs-container">
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Location Map</Tab>
            </TabList>

        
            <TabPanel>
              <div className="tab-content">
                <h2>Property Description</h2>
                <p dangerouslySetInnerHTML={{ __html: property.description }}></p>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="tab-content">
                <h2>Floor Plan</h2>
                {property.floorPlan ? (
                  <img
                    src={`${process.env.PUBLIC_URL}/${property.floorPlan}`}
                    alt="Floor Plan"
                    className="floorplan-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x400?text=Floor+Plan+Not+Available';
                    }}
                  />
                ) : (
                  <p>No floor plan available.</p>
                )}
              </div>
            </TabPanel>

      
            <TabPanel>
              <div className="tab-content">
                <h2>Location</h2>
                <iframe
                  title="property-map"
                  src={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&output=embed`}
                  width="100%"
                  height="450"
                  style={{ border: 0, borderRadius: '12px' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </TabPanel>
          </Tabs>
        </div>

        <div className="detail-added">
          <strong>Added:</strong> {property.added.month} {property.added.day}, {property.added.year}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;