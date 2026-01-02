import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  const nextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="image-gallery">

      <div className="gallery-main">
        <img 
          src={`${process.env.PUBLIC_URL}/${images[currentIndex]}`}
          alt={`Property view ${currentIndex + 1}`}
          className="gallery-main-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
          }}
        />
        
        <div className="gallery-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <h3 className="gallery-title">Gallery</h3>

      <div className="gallery-thumbnails-wrapper">
     
        {images.length > 5 && (
          <button 
            className="thumbnail-arrow thumbnail-arrow-left" 
            onClick={prevImage}
            aria-label="Previous image"
          >
            ‹
          </button>
        )}


        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${index === currentIndex ? 'thumbnail-active' : ''}`}
              onClick={() => goToImage(index)}
            >
              <img 
                src={`${process.env.PUBLIC_URL}/${image}`}
                alt={`Property view ${index + 1}`}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150x100?text=No+Image';
                }}
              />
            </div>
          ))}
        </div>

        {images.length > 5 && (
          <button 
            className="thumbnail-arrow thumbnail-arrow-right" 
            onClick={nextImage}
            aria-label="Next image"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;