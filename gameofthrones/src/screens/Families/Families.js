import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Families.css';

function Families() {
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    axios
      .get('https://thronesapi.com/api/v2/Characters')
      .then(function (response) {
        const allFamilies = response.data.map((character) => character.family);
        const uniqueFamilies = [...new Set(allFamilies)];
        const mergedFamilies = mergeSimilarFamilies(uniqueFamilies);
        setFamilies(mergedFamilies);
      })
      .catch(function (error) {
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
        mergedFamilies[existingFamily] = [...mergedFamilies[existingFamily], family];
      } else {
        mergedFamilies[normalizedFamily] = [family];
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

  return (
    <div className="families-container">
      <h1 className="families-title">Families</h1>
      <div className="families-grid">
        {Object.entries(families).map(([normalizedFamily, similarFamilies], index) => (
          <div key={index} className="family-group">
            <div className="family-group-title">{normalizedFamily}</div>
            <ul className="family-group-names">
              {similarFamilies.map((family, subIndex) => (
                <li key={subIndex}>{family}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Families;