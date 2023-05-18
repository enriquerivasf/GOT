import axios from "axios";
import { useEffect, useState } from "react";
import Character from "../../components/Character/Character";

function Main() {
  const [charactersByHouse, setCharactersByHouse] = useState({});

  useEffect(() => {
    axios
      .get("https://thronesapi.com/api/v2/Characters")
      .then(function (response) {
        const charactersByHouse = {};

        response.data.forEach((character) => {
          const house = getHouseName(character);

          if (charactersByHouse[house]) {
            charactersByHouse[house].push(character);
          } else {
            charactersByHouse[house] = [character];
          }
        });

        setCharactersByHouse(charactersByHouse);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const getHouseName = (character) => {
    const house = character.house || character.family || "Unknown";
    return house.replace("House ", "");
  };

  return (
    <div>
      {Object.entries(charactersByHouse).map(([house, characters]) => (
        <div key={house}>
          <h2>{house}</h2>
          {characters.map((character) => (
            <Character
              key={character.id}
              isDetailed={false}
              object={character}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Main;