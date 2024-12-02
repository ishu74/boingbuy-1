import React from 'react';
import './Loader.css'; 


const BoingBuyLoader = () => {
  return (
    <div className="loader">
      <img
        // src="/path-to-image/loader-image.webp" // Update the path to your image
        // src={require('../../../public/BB.webp')}
        src='./BB.webp'
        alt="Loading..."
        className="loader-image"
      />
    </div>
  );
};

export default BoingBuyLoader;
