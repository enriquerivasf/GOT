import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Families.css';
import { Link } from 'react-router-dom';
import lannisterImage from '../../images/lannisterImage.jpg';
import targaryenImage from '../../images/targaryenImage.jpg';
import starkImage from '../../images/starkImage.jpg';
import tarlyImage from '../../images/tarlyImage.jpg';
import baratheonImage from '../../images/baratheonImage.jpg';
import tyrellImage from '../../images/tyrellImage.jpg';
import boltonImage from '../../images/boltonImage.jpg';
import mormontImage from '../../images/mormontImage.jpg';
import greyjoyImage from '../../images/greyjoyImage.jpg';
import banderasPequeñas from '../../images/banderasImagePequeña.png';
import banderasMedianas from '../../images/banderasImageMediana.png';
import banderasGrandes from '../../images/banderasImageGrande.png';

const Families = () => {
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    axios
      .get('https://thronesapi.com/api/v2/Characters')
      .then((response) => {
        const allFamilies = response.data.map((character) => character.family);
        const uniqueFamilies = [...new Set(allFamilies)];
        const mergedFamilies = mergeSimilarFamilies(uniqueFamilies);
        setFamilies(mergedFamilies);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const mergeSimilarFamilies = (families) => {
    const mergedFamilies = {};

    families.forEach((family) => {
      const normalizedFamily = normalizeFamilyName(family);
      const existingFamily = Object.keys(mergedFamilies).find((mergedFamily) =>
        areSimilarNames(mergedFamily, normalizedFamily)
      );

      if (existingFamily) {
        mergedFamilies[existingFamily] = [
          ...mergedFamilies[existingFamily],
          { name: family, image: getFamilyImage(existingFamily) },
        ];
      } else {
        mergedFamilies[normalizedFamily] = [{ name: family, image: getFamilyImage(normalizedFamily) }];
      }
    });

    return mergedFamilies;
  };

  const normalizeFamilyName = (name) => {
    const normalizationRules = [
      { pattern: /House (Lannist(e|e)r|Lanister)/i, replacement: 'Lannister' },
      { pattern: /(House Targaryen|Targaryan)/i, replacement: 'Targaryen' },
      { pattern: /(House Stark|Stark)/i, replacement: 'Stark' },
      { pattern: /(House Tyrell|Tyrell)/i, replacement: 'Tyrell' },
      { pattern: /(House Baratheon|Baratheon)/i, replacement: 'Baratheon' },
      { pattern: /(House Greyjoy|Greyjoy)/i, replacement: 'Greyjoy' },
      { pattern: /Lorath|Lorathi/i, replacement: 'Lorath' },
      { pattern: /House Tarly/i, replacement: 'Tarly' },
    ];

    let normalized = name.trim();

    const matchingRule = normalizationRules.find((rule) => rule.pattern.test(normalized));

    if (matchingRule) {
      normalized = normalized.replace(matchingRule.pattern, matchingRule.replacement);
    }

    return normalized;
  };

  const areSimilarNames = (name1, name2) => {

  };

  const getFamilyImage = (family) => {
    switch (family) {
      case 'Lannister':
        return lannisterImage;
      case 'Targaryen':
        return targaryenImage;
      case 'Stark':
        return starkImage;
      case 'Tarly':
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

  const filteredFamilies = Object.entries(families).filter(([normalizedFamily, similarFamilies]) =>
    similarFamilies[0].image
  );

  return (
    <div className="families-container" >
      <div className='banderaImage'>
        <img src={banderasPequeñas} alt="Imagen de banderas pequeña" className='banderasPequeñas'></img>
        <img src={banderasMedianas} alt="Imagen de banderas mediana" className='banderasMedianas'></img>
        <img src={banderasGrandes} alt="Imagen de banderas grande" className='banderasGrandes'></img>
      </div>
      <div className='families-title-container'>
        <div className='separador'></div>
        <div><h1 className="families-title">Families</h1></div>
        <div className='separador'></div>
      </div>
      <div className="families-grid">
        {filteredFamilies.map(([normalizedFamily, similarFamilies], index) => (
          <div key={index} className="family-group">
            <Link to={`/families/${normalizedFamily}`} style={{ textDecoration: 'none' }}>
              <div className="family-group-container">
                <div className="family-group-title">{normalizedFamily}</div>
                <img
                  src={similarFamilies[0].image}
                  alt={normalizedFamily}
                  className="family-group-image"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Families;