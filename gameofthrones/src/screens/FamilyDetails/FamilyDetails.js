import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './FamilyDetails.css';
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
  
  const getCharacterVariations = (name) => {
    const variations = [];
    const lowerCaseName = name.toLowerCase();
  
    variations.push(name); 
    variations.push(lowerCaseName); 
  
    if (lowerCaseName.includes('house')) {
      const houseName = lowerCaseName.replace('house', '').trim();
      variations.push(houseName); 
    }
  
    if (lowerCaseName.endsWith('lannister')) {
      const lannisterName = lowerCaseName.replace('lannister', '').trim();
      variations.push(lannisterName);
    }
  
    if (lowerCaseName.endsWith('lanister')) {
      const lanisterName = lowerCaseName.replace('lanister', '').trim();
      variations.push(lanisterName); 
    }
  
    return variations;
  };

  const [characters, setCharacters] = useState([]);
  const [familyImage, setFamilyImage] = useState(null); 

  useEffect(() => {
    axios
      .get('https://thronesapi.com/api/v2/Characters')
      .then(function (response) {
        const filteredCharacters = response.data.filter((character) => {
          const characterVariations = getCharacterVariations(character.family);
          return (
            characterVariations.includes(familyName.toLowerCase()) ||
            (familyName === 'Targaryen' && characterVariations.includes('targaryan')) ||
            (familyName === 'Lannister' && characterVariations.includes('house lannister'))
          );
        });

        const uniqueCharacters = filteredCharacters.reduce((unique, character) => {
          if (!unique.some((c) => c.fullName === character.fullName)) {
            unique.push(character);
          }
          return unique;
        }, []);

        if (uniqueCharacters.length > 0) {
          setCharacters(uniqueCharacters);
        } else {
          console.log('No se encontraron personajes de la casa:', familyName);
        }
      })
      .catch(function (error) {
        console.log('Error al obtener los personajes:', error);
      });

    const image = getImageByFamilyName(familyName);
    setFamilyImage(image);
  }, [familyName]);

  const descriptions = {
    Lannister: 'Los Lannister son una de las casas más poderosas en los Siete Reinos. Su lema es "Oye mi rugido". Son conocidos por su riqueza y por pagar sus deudas. Procedentes de Roca Casterly, su emblema es un león dorado sobre fondo carmesí. Han gobernado como la Casa principal de las Tierras de Occidente durante siglos.',
    Targaryen: 'Los Targaryen son conocidos por su linaje de sangre de dragón y su historia legendaria. Durante siglos gobernaron los Siete Reinos hasta que fueron derrocados. Su lema es "Fuego y sangre". Procedentes de Valyria, su emblema es un dragón de tres cabezas. La Casa Targaryen es famosa por su habilidad para controlar y montar dragones.',
    Stark: 'La Casa Stark es conocida por su lema "Se acerca el Invierno" y su conexión con los lobos huargos. Son leales y justos. Gobernaron el Norte y tienen un fuerte sentido del honor. Procedentes de Invernalia, su emblema es un lobo huargo. Los Stark son conocidos por su linaje antiguo y su conexión con la magia de los Primeros Hombres.',
    Tarly: 'La Casa Tarly es una casa noble de las Tierras de los Ríos. Son conocidos por ser grandes guerreros y estrategas militares. Su lema es "Primero la sangre". Procedentes de Montehierro, su emblema es un cazador cazando un ciervo. Los Tarly son reconocidos por su habilidad en la caza y la educación militar de sus miembros.',
    Baratheon: 'La Casa Baratheon es una casa noble que una vez gobernó los Siete Reinos. Son conocidos por su fuerza y ferocidad en la batalla. Su lema es "Nuestra es la furia". Procedentes de Bastión de Tormentas, su emblema es un ciervo coronado. Los Baratheon se establecieron como la Casa Real después de la Rebelión de Robert contra el Rey Loco.',
    Tyrell: 'La Casa Tyrell es una casa noble de Altojardín. Son conocidos por ser hábiles en la diplomacia y la manipulación política. Son expertos en el cultivo de flores y jardines. Su lema es "Crecer fuerte". Procedentes de Altojardín, su emblema es una rosa dorada. Los Tyrell son conocidos por su riqueza y su influencia en la región de los Dominios.',
    Bolton: 'La Casa Bolton es una casa noble del Norte. Son conocidos por su brutalidad y crueldad. Su lema es "Nuestros cuchillos están afilados". Procedentes de Fuerte Terror, su emblema es un hombre desollado. Los Bolton son temidos en el Norte por su práctica de desollar a sus enemigos y su habilidad para el engaño y la traición.',
    Mormont: 'La Casa Mormont es una casa noble de la Isla del Oso. Son conocidos por su lealtad y valentía. Su lema es "Aquí estamos". Procedentes de la Isla del Oso, su emblema es un oso. Los Mormont son reconocidos por tener una fuerte presencia militar y por su destacada participación en la defensa del Norte.',
    Greyjoy: 'La Casa Greyjoy es una casa noble de las Islas del Hierro. Son conocidos por su habilidad en la navegación y su dominio del mar. Su lema es "Nosotros no sembramos". Procedentes de Pyke, su emblema es un kraken. Los Greyjoy son audaces y saqueadores, y su cultura se centra en la supremacía marítima y la independencia.',
  };

  const familyDescription = descriptions[familyName] || 'No hay descripción disponible';

  return (
    <div className="family-details-container">
      <h2 className="family-details-title">Detalles de la casa: {familyName}</h2>
      {familyImage && (
        <div className="family-details-image-container">
          <img src={familyImage} alt={familyName} className="family-details-image" />
        </div>
      )}
      <div className="family-details-description">{familyDescription}</div>

      {characters.length > 0 ? (
        <div>
          <h3>Personajes:</h3>
          <ul>
            {characters.map((character) => (
              <li key={character.id}>
                <Link to={`/characters/${character.id}`}>{character.fullName}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No hay personajes disponibles.</div>
      )}

      <Link to="/">Volver</Link> {/* Botón de volver */}
    </div>
  );
};

export default FamilyDetails;