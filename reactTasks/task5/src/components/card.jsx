import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { handleFav } from '../Redux/Actions/FavAction';
function Card(props){
    React.useEffect(() => {
        console.log("Card component rendered with props:", props);
    }, []);

    const myfavs = useSelector((state)=> state.RfavReducer.fav); 
    const isFav = myfavs.includes(props.id)
    const dispatch = useDispatch();
    const handleFavoriteClick = () => {
       dispatch(handleFav(props.id));
    }

    return(
        <>
        <div className="hover-3d hover:cursor-pointer flex flex-wrap" >
  {/* content */}

  <figure className="w-60 rounded-2xl">
    <p className="text-lg truncate w-full font-bold text-center mb-2">
        {props.title}
    </p>
        <div className='flex items-center justify-evenly '>

        <p className="text-yellow-400 flex items-center justify-center"> <StarIcon />   {props.rating}  </p>
        
            <div 
        onClick={handleFavoriteClick}
        className="flex items-center justify-center mt-2"
    >
        {isFav 
            ? <FavoriteIcon className="cursor-pointer text-red-500" />
            : <FavoriteBorderIcon className="cursor-pointer hover:text-red-500" />
        }
    </div>

        

        </div>
    
   <div>
    {/* Image — no click handler */}
    {props.image && (
        <img 
            src={props.image} 
            alt={props.title} 
            className="rounded-2xl w-full mb-2" 
        />
    )}

    {/* Favorite button — only the icon is clickable */}
    
</div>
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