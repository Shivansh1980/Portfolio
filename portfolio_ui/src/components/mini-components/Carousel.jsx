import React, { useState } from 'react';
import './Carousel.css'; // Create a CSS file for your carousel styles

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide`}
          >
            {slide.imageSrc && (
              <img src={slide.imageSrc} alt={slide.label} />
            )}
            <div className="carousel-content">
              {slide.message && <p className="carousel-message">{slide.message}</p>}
              {slide.label && <p className="carousel-label">{slide.label}</p>}
              {slide.component?slide.component:null}
            </div>
          </div>
        ))}
      </div>
      <button className="prev-button" onClick={prevSlide}>
        Previous
      </button>
      <button className="next-button" onClick={nextSlide}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
