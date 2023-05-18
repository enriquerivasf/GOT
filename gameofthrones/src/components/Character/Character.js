import { Link } from "react-router-dom";


function Character(props) {

  if (props.isDetailed){
    return (
      <div>
        <h1>{props.object.fullName}</h1>
        <img src={props.object.imageUrl} alt={props.object.fullName}/>
        <p>{props.object.firstName}</p>
        <p>{props.object.lastName}</p>
        <p>{props.object.title}</p>
        <p>{props.object.family}</p>
      </div>
    );}
    return (
      <Link to={`/characters/${props.object.firstName}-${props.object.lastName}`}
        state={{id:props.object.id}}>
        <img src={props.object.imageUrl} alt={props.object.fullName}/>
        <p>{props.object.fullName}</p>
      </Link>
    );
}


export default Character;