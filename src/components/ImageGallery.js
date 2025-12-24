import React, { useState } from 'react';
import './ImageGallery.css';

/**
 * ImageGallery Component
 * Displays property images with thumbnail navigation
 */
const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  /**
   * Navigate to next image
   */
  const nextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  /**
   * Navigate to previous image
   */
  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  /**
   * Go to specific image
   */
  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="image-gallery">
      {/* Main Image Display */}
      <div className="gallery-main">
        <img 
          src={`${process.env.PUBLIC_URL}/${images[currentIndex]}`}
          alt={`Property view ${currentIndex + 1}`}
          className="gallery-main-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
          }}
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              className="gallery-arrow gallery-arrow-left" 
              onClick={prevImage}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button 
              className="gallery-arrow gallery-arrow-right" 
              onClick={nextImage}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="gallery-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="gallery-thumbnails">
        <div className="thumbnails-container">
          {images.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${index === currentIndex ? 'thumbnail-active' : ''}`}
              onClick={() => goToImage(index)}
            >
              <img 
                src={`${process.env.PUBLIC_URL}/${image}`}
                alt={`Thumbnail ${index + 1}`}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150x100?text=No+Image';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;