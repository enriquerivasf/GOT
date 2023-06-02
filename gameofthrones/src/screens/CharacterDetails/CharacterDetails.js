import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CharacterDetails.css';

const characterDescriptions = {
  0: 'Daenerys Targaryen - Nacida en 284 d.C. en Rocadragón, la princesa Daenerys fue hija póstuma del rey Aerys II Targaryen y su hermana esposa, la reina Rhaella Targaryen. Daenerys nació en medio de una impresionante tormenta que azotó la isla de Rocadragón, lugar donde se habían refugiado su madre, quien murió en el parto, y su hermano Viserys. Por esta razón es en ocasiones llamada "Daenerys de la Tormenta." Daenerys es descrita como una muchacha adolescente de aspecto valyrio clásico, con el cabello rubio plateado, los ojos de color púrpura y contextura delgada. Se dice que posee una cierta semejanza física a la reina Naerys Targaryen, aunque Daenerys es más alta. Daenerys creció aterrorizada y abusada psicológicamente por su hermano Viserys. Sin embargo, eventualmente se convierte en una adolescente segura de sí misma y sus seguidores generalmente la aprecian y tratan con gran respeto y amor. Ser Jorah Mormont y Ser Barristan Selmy la han comparado con su hermano fallecido, el príncipe Rhaegar Targaryen, en términos de valentía, honorabilidad y nobleza. Como varios descendientes de los señores dragón del Feudo Franco de Valyria, Daenerys sueña con dragones. Aunque está familiarizada con la Fe de los Siete y cree en la existencia de los dioses, no parece seguir una fe en particular.',
  1: 'Samwell Tarly - Samwell Tarly es el hijo mayor de Lord Randyll Tarly y Lady Melessa Florent. La niñez de Samwell estuvo marcada por los insultos y quejas de su padre, Lord Randyll Tarly, quien trató en vano de convertir al tímido y gentil Samwell en un caballero. Samwell es descrito como un muchacho gordo y torpe. Tiene ojos claros, el cabello oscuro y un rostro con forma de luna llena. Aunque es tímido, cobarde e inseguro de sí mismo, es inteligente y reflexivo, lo que sin embargo no demuestra abiertamente. No le gusta la visión de la sangre y es aficionado a la lectura y música.',
  2: 'Jon Snow - Jon Nieve, nacido Aegon Targaryen, es el hijo de Lyanna Stark y el príncipe Rhaegar Targaryen, difunto Príncipe de Rocadragón. Desde su infancia, Jon fue criado como el hijo bastardo de su tío Lord Eddard Stark, junto a sus hijos legítimos con Lady Catelyn Tully en Invernalia. A pesar de compartir un matrimonio feliz, la presencia de Jon en Invernalia fue una fuente constante de fricción entre Eddard y Catelyn, quien aunque nunca maltrató a Jon, si lo evitaba siempre que era posible, viéndolo como un recordatorio vivo de la única vez que Eddard la había deshonrado. Jon es un joven valiente y noble, reconocido por su cabello oscuro y sus ojos grises. Su historia comienza en el norte de Westeros, donde se une a la Guardia de la Noche, un antiguo orden encargada de proteger el reino de los peligros más allá del Muro. A lo largo de su historia, Jon muestra una gran habilidad en el combate y una ética sólida, siempre luchando por lo que considera justo. Su camino está lleno de desafíos y dilemas morales que lo llevan a tomar decisiones difíciles y a enfrentarse a situaciones peligrosas. Jon Snow se convierte en un líder carismático y respetado, ganándose la lealtad de aquellos a su alrededor.',
  3: 'Arya Stark - Arya Stark es la segunda hija de Lord Eddard Stark y Lady Catelyn Tully. Tiene una hermana, Sansa; tres hermanos, Robb, Brandon y Rickon, y un medio-hermano bastardo, Jon Nieve, al que aprecia mucho. Como algunos de sus hermanos, ella es una cambiapieles, pudiendo entrar en la piel de su loba huargo, Nymeria. Arya es delgada y atlética. Es zurda. Su apariencia favorece su lado paterno, los Stark: tiene el pelo castaño oscuro, ojos grises y rostro alargado. Es frecuentemente considerada poco femenina y muchas veces tomada por un chico. Sin embargo, hay instancias en las que se le considera hermosa, comparándola con su tía Lyanna. A través de sus viajes, Arya demuestra gran ingenio, astucia y la capacidad firme de aceptar las necesidades, por duras que sean. Se dice que su temperamento es similar al de su tía Lyanna.',
  4: 'Sansa Stark - Sansa Stark es la hija mayor de Lord Eddard Stark y Lady Catelyn Tully. Tiene tres hermanos, Robb, Brandon y Rickon; una hermana, Arya, y un medio hermano bastardo, Jon Nieve. Está casada con Tyrion Lannister. Sansa es descrita como una muchacha tradicionalmente hermosa; su apariencia favorece su lado materno, los Tully, pues posee pómulos altos, ojos azules y espeso cabello castaño rojizo. Al crecer, su figura ha sido descrita como alta, agraciada y femenina.',
  5: 'Brandon Stark - Brandon Stark, mejor conocido como Bran, es el segundo hijo y heredero de Lord Eddard Stark y Lady Catelyn Tully. Tiene dos hermanas, Sansa y Arya; dos hermanos, Robb y Rickon, y un medio-hermano bastardo, Jon Nieve. Debido a una caída, queda paralítico y depende de Hodor, un mozo de cuadra retrasado, para desplazarse. Está siempre acompañado de su lobo huargo Verano, con quien mantiene una poderosa conexión warg. Bran es descrito como un muchacho con el pelo castaño rojizo y profundos ojos azules, rasgos que favorecen los de la Casa Tully. Es un chico dulce y reflexivo, muy querido por todos en Invernalia. Tiene una gran fascinación con la escalada y la exploración de los muros y techos del castillo.',
  6: 'Ned Stark - Ned Stark es el Señor de Invernalia y patriarca de la Casa Stark. A la muerte de su tutor, Jon Arryn, el rey Robert Baratheon lo nombra Mano del Rey. Ned tendrá que introducirse en un mundo lleno de intrigas y conspiraciones, donde su honor y lealtad no tendrán cabida. Conforme avanza la trama, Ned se percata de que el rey está rodeado de advenedizos y aduladores y que no es consciente (ni quiere serlo) del peligro que acecha a su alrededor. Finalmente, todo desembocará en una encrucijada donde Ned tendrá que decidir entre hacer lo que es correcto y lo que guía su honor o preferir la seguridad de su familia. A Ned Stark se le describe en la obra como un hombre muy honorable, leal y que trata siempre de actuar según su código moral. Estas aptitudes le llevaron a ser querido por sus súbditos, admirado por sus hijos y respetado incluso por sus enemigos. Sin embargo, Ned guardó un gran complejo de inferioridad debido a su hermano mayor Brandon, al que él consideraba superior en todo y era muy distinto en cuanto a su personalidad. Su propia esposa, Catelyn Tully, describió a Ned como un hombre callado y distante. Debido a todo esto, Ned no desarrolló gran habilidad política, pecando de ingenuo y bienintencionado.',
  7: 'Robert Baratheon - El rey Robert Baratheon fue cabeza de la Casa Baratheon y Señor de Bastión de Tormentas. Robert es descrito como un hombre robusto y dado a los excesos de todo tipo. Aunque no particularmente inteligente, fue reconocido como un renombrado guerrero. En su juventud era descrito como alto, ancho de hombros y atlético, el sueño de toda doncella. No llevaba barba, pero tras ser coronado rey acumuló peso debido a los banquetes frecuentes y el beber en exceso. Robert es reconocido como un cazador ávido y en sus días más jóvenes prefería manejar un martillo de guerra de hierro. Se le describía como encantador, extrovertido y poseedor de una personalidad atrayente y carismática.',
  8: 'Jaime Lannister - Ser Jaime Lannister, apodado Matarreyes, es el Lord Comandante de la Guardia Real del rey Tommen I Baratheon. Es el segundo hijo de Lord Tywin Lannister y Lady Joanna Lannister, y tiene una hermana gemela llamada Cersei, así como un hermano menor llamado Tyrion. Ganó el apodo de Matarreyes por asesinar al rey Aerys II Targaryen al final de la Rebelión de Robert. Jaime es descrito como un hombre alto y vigoroso, con cabello dorado, ojos verdes y una sonrisa afilada. Es considerado un guerrero natural y atractivo, al igual que otros miembros de la Casa Lannister. Por lo general, viste de blanco como miembro de la Guardia Real y lleva una armadura distintiva con el emblema de la casa Lannister, así como un yelmo en forma de cabeza de león. Aunque en ocasiones puede ser arrogante y deshonroso, Jaime también ha mostrado cualidades de valentía y habilidad en la lucha. Su reputación se ve afectada por sus actos reprobables, como su relación incestuosa con su hermana Cersei.',
  9: 'Cersei Lannister - La reina Cersei Lannister es la hija mayor de Lord Tywin Lannister y Lady Joanna Lannister. Tiene dos hermanos, Jaime, su mellizo, y Tyrion, su hermano menor. Después de la Guerra del Usurpador, se casó con el nuevo rey, Robert Baratheon, y se convirtió en Reina de los Siete Reinos. Cersei es descrita como una mujer bella, con cabello dorado, ojos verdes y una figura esbelta. Se la considera una de las mujeres más bellas de Poniente. Es profundamente narcisista y ambiciosa, dispuesta a hacer cualquier cosa para alcanzar el poder y el prestigio para ella y sus hijos. No muestra consideración por los demás y está llena de amargura por las injusticias que ha sufrido en su vida. Cersei es astuta y manipuladora, y ha desempeñado un papel clave en eventos como la muerte del rey Robert y el estallido de la Guerra de los Cinco Reyes. Sin embargo, a pesar de sus maquinaciones, Cersei demuestra ser incapaz de manejar el poder una vez que lo obtiene. Su temperamento y su orgullo herido la llevan a tomar decisiones precipitadas sin considerar las consecuencias. Aunque se resiente de las restricciones impuestas por la cultura patriarcal de Poniente, también ha internalizado parte de este sexismo y tiene una actitud negativa hacia otras mujeres, a quienes considera débiles y despreciables.',
  10: 'Catelyn Stark - Catelyn Tully es representada como la voluntariosa matriarca de la Casa Stark. En la saga, Catelyn es reconocida como una mujer fuerte, honorable y con un profundo amor por su familia, haciendo todo lo que está en su mano por protegerlos. Sin embargo, su impulsividad y falta de miras provocarán diversos sucesos que serán decisivos en el devenir de la saga. Catelyn es descrita como una mujer hermosa, de piel clara, con cabello caoba, los ojos azules, dedos largos y pómulos altos. Se dice que guarda cierto parecido con su madre. Catelyn es una mujer orgullosa, fuerte, amable y generosa. Es vista como honorable y recta por sus conocidos, manteniendo el deber sobre el deseo como uno de sus principios. Catelyn también posee una fuerte comprensión de la política, y de todo lo que ocurre en Poniente. Sin embargo, Catelyn es también una mujer ferozmente protectora, dejándose llevar más por sus sentimientos que por sus pensamientos, especialmente cuando se trata de su familia, a quienes ama profundamente.',
  11: 'Robb Stark - El rey Robb Stark fue el hijo primogénito de Lord Eddard Stark y Lady Catelyn Tully, siendo desde su nacimiento el heredero de Invernalia y el Norte. Tiene dos hermanas, Sansa y Arya; dos hermanos, Brandon y Rickon, y un medio-hermano bastardo, Jon Nieve. Era frecuentemente acompañado por su lobo huargo Viento Gris, quien siempre le acompañaba en la batalla. Robb es descrito como un joven con rasgos Tully; era fuerte y corpulento, de piel clara, ojos azules y pelo espeso marrón rojizo. Tenía un gran sentido del honor y la justicia, al igual que su padre. Suele ir ataviado con armadura y equipado con un escudo de roble decorado con una cabeza de lobo huargo.',
  12: 'Theon Greyjoy - Theon Greyjoy es el tercer hijo y heredero de Lord Balon Greyjoy y Lady Alannys Harlaw. Después de la Rebelión Greyjoy, Theon fue llevado a Invernalia como pupilo de Lord Eddard Stark para asegurar la lealtad de los Hombres del Hierro. Sirviendo al rey Robb Stark, fue enviado a las Islas del Hierro como mensajero, donde se convirtió en capitán del Zorra Marina. Theon es descrito como un joven apuesto con cabello negro-marrón, un rasgo común entre los Greyjoy. Es conocido por su arrogancia y su irritante sonrisa. Tiene una actitud promiscua y vanidosa, pero detrás de su faceta arrogante oculta inseguridades relacionadas con su incierta identidad familiar y social. En ocasiones, viste un sobreveste negro adornado con el kraken de la Casa Greyjoy sobre una camisa de malla fina.',
  18: 'Stannis Baratheon - El rey Stannis Baratheon es cabeza de la Casa Baratheon de Rocadragón y Señor de Rocadragón. Stannis es descrito como un hombre alto, calvo, de ojos azules y con la sombra de una barba. Es tenaz y carente de sentido del humor, conocido por su duro e inalterable sentido de la justicia y por su obsesión con los desaires que ha sufrido. Rechina los dientes constantemente. Es considerado un comandante, marinero y guerrero experimentado, pero su personalidad dificulta su ascenso a ser un líder verdaderamente grande. Aunque es respetado y temido, nunca ha sido amado o ha tenido el cariño de la nobleza o el pueblo llano. En batalla, lleva una armadura gris y su blasón es un corazón llameante incrustado en el pecho. Tiene una relación fría con su esposa, Lady Selyse de la Casa Florent, y tienen una hija llamada Shireen, una niña triste y desfigurada por la psoriagrís.',
  20: 'Khal Drogo - Fue hijo de Bharbo. Nunca había sido derrotado, por lo que su trenza era larga y estaba llena de campanillas, simbolizando su poderío. Poseía un palacio en Vaes Dothrak y una mansión de nueve torres en Pentos, regalo de los magísteres de la ciudad para mantener relaciones de paz. Drogo es descrito como un hombre de piel cobriza, con cabello y ojos negros, alto y agraciado. Tenía bigote y barba larga y usaba el cabello en una trenza que caía hasta sus muslos, con pequeñas campanillas.',
  21: 'Margaery Tyrell - La reina Margaery Tyrell es la única hija de Lord Mace Tyrell y Lady Alerie Hightower. Tiene tres hermanos, Willas, Garlan y Loras. Por sus matrimonios con Renly Baratheon, Joffrey I Baratheon y, su último y actual esposo, Tommen I Baratheon, se convirtió en Reina de los Siete Reinos. Margaery es descrita como una joven hermosa y grácil, con cabello marrón en suaves rizos, grandes ojos marrones, piel impecable y una figura esbelta pero femenina y bien proporcionada. Es una mujer inteligente y astuta en política. Su sonrisa es afable y tímida, pero detrás de su apariencia inocente se encuentra una joven perspicaz. Margaery se beneficia de la protección de su abuela, Lady Olenna Redwyne. Comparte con sus primas el gusto por los bardos y los malabaristas, y es una entusiasta de las justas y la cetrería.',
  26: 'Viserys Targaryen - El rey Viserys III Targaryen, apodado el Rey Mendigo, fue el quinto hijo del rey Aerys II Targaryen y su hermana esposa, la reina Rhaella. Se convirtió en el heredero de su padre después de que su hermano Rhaegar muriera en la Rebelión de Robert. La guerra lo convirtió en exiliado, desde donde planeó recuperar el control del Trono de Hierro. Se hacía llamar Su Alteza Viserys Targaryen, el Tercero de su Nombre, Rey de los Ándalos, los Rhoynar y los Primeros Hombres, Señor de los Siete Reinos y Protector del Reino, después de que su madre, la reina Rhaella, lo proclamase rey en Rocadragón durante los primeros años de exilio. Viserys es descrito como un hombre de rostro fuerte y afilado, cabello rubio plateado y ojos lilas, rasgos típicos de los Targaryen. Viserys era un hombre ambicioso, pero también impaciente, delirante, y ciego a la realidad. Se veía a sí mismo como un rey legítimo, merecedor de respeto y admiración instantáneas, considerando que lo contrario sería tomado como un insulto.',
  27: 'Rickon Stark - Rickon Stark es el hijo menor de Lord Eddard Stark y Lady Catelyn Tully. Tiene dos hermanos, Robb y Brandon; dos hermanas, Sansa y Arya, y un medio-hermano bastardo, Jon Nieve. Normalmente es acompañado por su lobo huargo, Peludo. Rickon es un niño naturalmente agresivo y voluntarioso. Su juventud le hace difícil entender y aceptar los cambios que sufre su familia debido a la guerra. Tiene ojos claros y su apariencia favorece a la familia de su madre, los Tully.',
  28: 'Roose Bolton - Lord Roose Bolton, apodado Lord Sanguijuela, es el cabeza de la Casa Bolton y el Señor de Fuerte Terror. Tras la Boda Roja, es nombrado Guardián del Norte. Está casado en terceras nupcias con Walda Frey. Roose es descrito como un hombre paciente, con una fría astucia y una gran habilidad para la estrategia y el cálculo. Tiene una estatura mediana y un aspecto ordinario, siendo sus ojos misteriosos y pálidos su única característica notable. A pesar de superar los cuarenta años, no muestra arrugas ni signos evidentes del paso del tiempo en su rostro. Ha participado en numerosas batallas, pero no tiene cicatrices. Su piel es de un tono pálido y pastoso, posiblemente debido a los tratamientos con sanguijuelas que recibe. Roose suele hablar en voz baja y rara vez eleva el tono de su voz, lo que obliga a los que lo escuchan a prestar atención. Suele vestir una cota de malla negra y una capa de lana rosa, bordada con gotas de sangre.',
  31: 'Tommen Baratheon - El rey Tommen Baratheon es descrito como un niño regordete con el pelo rubio muy claro y rizado. A diferencia de su hermano Joffrey, es considerado un muchacho de buen corazón y siempre trata de hacer todo de la mejor forma posible. Aunque no es tan voluntarioso como Joffrey, muchos creen que será un mejor rey que su hermano. Tommen adora la lectura y es el tercer hijo del rey Robert Baratheon y la reina Cersei Lannister. Su padre biológico es en realidad Ser Jaime Lannister, el hermano de la reina.',
  32: 'Gendry Baratheon - Gendry, apodado el Toro, es descrito como un muchacho alto y musculoso, con cabello negro y ojos azules, portando los rasgos característicos de su padre, Robert Baratheon. Posteriormente, se deja crecer una espesa y negra barba. Es conocido por ser testarudo y fue uno de los hijos bastardos del rey Robert Baratheon, nacido de la empleada de una taberna. Gendry se une a la Hermandad sin Estandartes y es ungido caballero por Lord Beric Dondarrion con el nombre de Ser Gendry de la Colina Hueca.',
  33: 'Jorah Mormont - Ser Jorah Mormont es un caballero exiliado. Fue cabeza de la Casa Mormont y Señor de Isla del Oso, hasta que huyó de Poniente para evadir la ejecución por traficar con esclavos. En el exilio, se convirtió en uno de los compañeros más leales de Daenerys Targaryen. Jorah es descrito como un hombre de mediana edad, robusto, con calvicie incipiente. Es fuerte y está en buena forma, con un cuello y hombros robustos, y el pecho y los brazos cubiertos de un vello negro y crespo muy espeso. Daenerys no lo considera particularmente atractivo.',
  34: 'Robert Baratheon - El rey Robert Baratheon fue cabeza de la Casa Baratheon y Señor de Bastión de Tormentas. Robert es descrito como un hombre robusto y dado a los excesos de todo tipo. Aunque no particularmente inteligente, fue reconocido como un renombrado guerrero. En su juventud era descrito como alto, ancho de hombros y atlético, el sueño de toda doncella. No llevaba barba, pero tras ser coronado rey acumuló peso debido a los banquetes frecuentes y el beber en exceso. Robert es reconocido como un cazador ávido y en sus días más jóvenes prefería manejar un martillo de guerra de hierro. Se le describía como encantador, extrovertido y poseedor de una personalidad atrayente y carismática.',
  35: 'Ramsay Bolton - Lord Ramsay Bolton es el hijo bastardo legitimado de Lord Roose Bolton. Originalmente conocido como Ramsay Nieve, fue llamado el Bastardo de Bolton y el Bastardo de Fuerte Terror. Tras sus matrimonios, se proclamó Señor de Hornwood y Señor de Invernalia. Ramsay es descrito como un hombre feo, de apariencia carnosa, con grandes labios en forma de gusanos y cabello largo y oscuro. Es conocido por su crueldad y salvajismo, deleitándose en torturar a los demás. Apoya la antigua costumbre Bolton de desollar a sus enemigos. Aunque no es muy inteligente, es manipulador y disfruta abiertamente de prácticas enfermas y abusivas. Aunque es feroz en batalla, nunca ha recibido un entrenamiento adecuado. Su tutor fue Hediondo, su sirviente, quien tampoco recibió entrenamiento. El estilo de lucha de Ramsay es altamente agresivo, blandiendo su espada como si fuera un cuchillo de carnicero. Tiene a su lado un grupo de hombres que le son leales y disfrutan de su favor, conocidos como los Bribones del Bastardo, aunque nunca lo dicen en su cara o delante de él. Son igual de perversos y depravados que su líder. El caballo de Ramsay se llama Sangre.',
  36: 'Talisa Stark - Talisa nació en Volantis. Sin embargo, a los doce años, tras ver cómo su hermano menor casi muere ahogado en el río Rhoyne, antes de ser salvado por un esclavo que arriesgó su vida, decidió dos cosas: que cuando llegara a la mayoría de edad, no desperdiciaría su vida bailando con otros nobles ni haciendo todo lo que una dama noble e inútil haría, y que nunca más viviría en un lugar en el cual la esclavitud estuviera permitida. Talisa es representada como una mujer joven en cuya personalidad destacan la bondad y la generosidad para ayudar a los pobres. Posee un fuerte carácter, el cual la llevó a abandonar su lugar de noble en Volantis para convertirse en curandera y sentirse útil ayudando a los que verdaderamente la necesitan. Conoció al Rey en el Norte Robb Stark durante la Guerra de los Cinco Reyes y eventualmente se casó con él.',
  37: 'Jeor Mormont - Lord Jeor Mormont, apodado el Viejo Oso, fue el Lord Comandante de la Guardia de la Noche nº 997. Previo a ser un hermano negro, Jeor fue cabeza de la Casa Mormont y Señor de Isla del Oso, títulos a los que abdicó en favor de su hijo, Ser Jorah Mormont. Jeor es descrito como un hombre viejo de enorme cabeza calva y barba gris hirsuta. Tiene hombros anchos y una mirada severa. Es considerado un líder fuerte y decidido, un comandante en batalla formidable y audaz frente a la adversidad. Jeor siempre está acompañado por su cuervo mascota, que constantemente exige maíz.',
  42: 'Tywin Lannister - Lord Tywin Lannister fue cabeza de la Casa Lannister y Señor de Roca Casterly, Escudo de Lannisport y Guardián del Occidente. Ejerció como Mano del Rey de Aerys II Targaryen durante casi veinte años y volvió a ocupar el cargo durante los reinados de sus nietos Joffrey y Tommen Baratheon. Tywin es descrito como un hombre alto y fuerte, con ojos verde claro con vetas doradas. En su juventud tenía cabello rubio dorado, pero al envejecer empezó a perderlo, por lo que se afeitó la cabeza, la barba y el bigote, aunque conserva las patillas doradas que le cubren las mejillas. En batalla, suele vestir una armadura carmesí resaltada de dorado. Tywin es un hombre calculador, inteligente y políticamente astuto. Dedica su vida y esfuerzos a mantener el prestigio de los Lannister, asegurándose de que sean respetados e incluso temidos. Es conocido como un comandante probado en batalla y tiene una presencia imponente.',
  45: 'Yara Greyjoy - Lady Yara Greyjoy es la Señora de las Islas del Hierro y Lady Segadora de Pyke. Es la hija y última heredera superviviente de Balon Greyjoy y hermana de Theon Greyjoy. Fue criada en Pyke, la fortaleza de la Casa Greyjoy. Yara es una fiera guerrera y comandante de su propio Barcoluengo, el Viento Negro. Tras el asesinato de su padre, Yara reclama las Islas del Hierro, pero cuando los Hombres del Hierro eligen a su tío Euron como nuevo rey, ella y Theon huyen con una porción de la Flota de Hierro y sus seguidores.',
  46: 'Euron Greyjoy - El rey Euron Greyjoy, apodado Ojo de Cuervo, es el Rey de las Islas del Hierro y del Norte. Fue elegido en una asamblea de sucesión tras la muerte de su hermano Balon. Euron es el capitán del Silencio, un barco tripulado enteramente por mudos cuyas lenguas fueron arrancadas por él. Su emblema personal es un ojo rojo bajo una corona de hierro negro sostenida por dos cuervos. Es descrito como un hombre atractivo de piel clara, cabello y barba negros. Usa un parche en el ojo izquierdo, que oculta "un ojo negro brillante de malicia", según su sobrino Theon. Su ojo derecho es de un azul brillante y es conocido como su "ojo sonriente". Sus labios son azules debido a su inclinación por beber color-del-ocaso. Euron es un hombre de temperamento impredecible y disfruta de los juegos mentales y la guerra psicológica. Es odiado por sus hermanos y se le considera astuto, sagaz e implacable en la batalla.',
  47: 'Hodor - Hodor es un mozo de cuadras de Invernalia. Su verdadero nombre es Walder. Hodor es descrito como un hombre alto de entendimiento lento, pero gentil y leal a la familia Stark. Sólo es capaz de decir una sola palabra, "Hodor". Mide más de siete pies de altura, tiene los ojos castaños y barba castaña.',
  50: 'Olenna Tyrell - Lady Olenna Redwyne, también conocida como Olenna Tyrell y apodada la Reina de las Espinas, fue la anciana matriarca de la Casa Tyrell y la última cabeza conocida de esa casa. Lady Olenna era una experta en la política de la corte y se dedicó a conspirar e intrigar a lo largo de su vida. Era conocida por su ingenio y sarcasmo. En muchos aspectos, ella era la líder de facto de la Casa Tyrell durante la Guerra de los Cinco Reyes y parecía tener una gran influencia en el gobierno del Dominio.',
};

const CharacterDetails = () => {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const description = characterDescriptions[characterId];

  useEffect(() => {
    axios
      .get(`https://thronesapi.com/api/v2/Characters/${characterId}`)
      .then(function (response) {
        setCharacter(response.data);
      })
      .catch(function (error) {
        console.log('Error al obtener los detalles del personaje:', error);
      });
  }, [characterId]);

  return (
    <div className="character-details-container">
      {character ? (
        <div>
          <h2 className='character-title-title'>{character.fullName}</h2>
          <img className='character-image' src={character.imageUrl} alt={character.fullName} />
          <div className='character-titles-container'>
            <p className='character-title'>Nombre: <span className='character-title-span'>{character.fullName}</span> </p>
            <p className='character-title'>Título: <span className='character-title-span'>{character.title}</span></p>
            <p className='character-title'>Familia: <span className='character-title-span'>{character.family}</span></p>
          </div>
          <p className='character-title'>Descripción:</p>
          <p className='character-title-descripcion'><div className='character-title-span'>{description}</div> </p>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
      <Link to="/families/"><button className='Character-button-volver'>Volver</button></Link> {/* Botón de volver */}
    </div>
  );
};

export default CharacterDetails;