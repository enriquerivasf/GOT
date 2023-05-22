import React from 'react';
import { useParams } from 'react-router-dom';
import './FamilyDetails.css';

import lannisterImage from '../../images/lannisterImage.jpg';
import targaryenImage from '../../images/targaryenImage.jpg';
import starkImage from '../../images/starkImage.jpg';
import tarlyImage from '../../images/tarlyImage.jpg';
import baratheonImage from '../../images/baratheonImage.jpg';
import tyrellImage from '../../images/tyrellImage.jpg';
import boltonImage from '../../images/boltonImage.jpg';
import mormontImage from '../../images/mormontImage.jpg';
import greyjoyImage from '../../images/greyjoyImage.jpg';


const FamilyDetails = () => {
  const { familyName } = useParams();

  const getImageByFamilyName = (name) => {
    switch (name) {
      case 'Lannister':
        return lannisterImage;
      case 'Targaryen':
        return targaryenImage;
      case 'Stark':
        return starkImage;
      case 'House Tarly':
        return tarlyImage;
      case 'Baratheon':
        return baratheonImage;
      case 'Tyrell':
        return tyrellImage;
      case 'Bolton':
        return boltonImage;
      case 'Mormont':
        return mormontImage;
      case 'Greyjoy':
        return greyjoyImage;
      default:
        return null;
    }
  };

  const familyImage = getImageByFamilyName(familyName);

  return (
    <div className="family-details-container">
      <h2 className="family-details-title">Detalles de la casa: {familyName}</h2>
      {familyImage && <img src={familyImage} alt={familyName} className="family-details-image" />}
    </div>
  );
};


export default FamilyDetails;