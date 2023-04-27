import React, { useState } from 'react';
import { SliderData } from './SliderData';
import ArrowLeft from '../images/arrowL.png';
import ArrowRight from '../images/arrowR.png';
const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }
  //<ArrowLeft className='left-arrow' onClick={prevSlide} />
      //<ArrowRight className='right-arrow' onClick={nextSlide} />

  return (
    <div className='slider'>
    <div><img src={ArrowLeft} alt="Left Arrow" className='left-arrow' onClick={prevSlide} /></div>
     
        

      <div>
      {SliderData.map((slide, index) => {
        
        if(index < length)
        {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
                <img src={slide.image} alt='travel image' className='image' /> 
            )}
          </div>
        )};
      })}
      </div>
      <div><img src={ArrowRight} alt="Right Arrow" className='right-arrow' onClick={nextSlide} /></div>
    </div>
  );
};



export default ImageSlider;