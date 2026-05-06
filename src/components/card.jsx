import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import React from 'react';

function Card(props){
    React.useEffect(() => {
        console.log("Card component rendered with props:", props.id);
    }, []);



    return(
        <>
        <div className="hover-3d hover:cursor-pointer flex flex-wrap" >
  {/* content */}

  <figure className="w-60 rounded-2xl">
    <p className="text-lg truncate w-full font-bold text-center mb-2">
        {props.title}
    </p>

    <p className="text-yellow-400 flex items-center justify-center"> <StarIcon />   {props.rating}  </p>

    <p>
        {props.image && <img src={props.image} alt={props.title} className="rounded-2xl" />}
    </p>
    
        <Link to={`/movie/${props.id}`} className="btn btn-outline hover:bg-slate-500 w-full mt-4">
            View Details
        </Link>    
    
  </figure>
  {/* 8 empty divs needed for the 3D effect */}
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
    
       </>
    
    );
}

export default Card;