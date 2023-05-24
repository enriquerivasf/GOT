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
  }, []);

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
    const similarityThreshold = 0.8;

    const distance = levenshteinDistance(name1.toLowerCase(), name2.toLowerCase());
    const similarity = 1 - distance / Math.max(name1.length, name2.length);

    return similarity >= similarityThreshold;
  };

  const levenshteinDistance = (str1, str2) => {
    const m = str1.length;
    const n = str2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
      dp[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
        }
      }
    }

    return dp[m][n];
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
    <div className="families-container">
      <h1 className="families-title">Families</h1>
      <div className="families-grid">
        {filteredFamilies.map(([normalizedFamily, similarFamilies], index) => (
          <div key={index} className="family-group">
            <Link to={`/families/${normalizedFamily}`}>
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