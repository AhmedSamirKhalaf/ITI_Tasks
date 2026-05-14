import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Fav(){
    const favMovies = useSelector((state)=> state.RfavReducer.fav);
    const [Movies , setMovies] = useState([]);


    useEffect(
        ()=>{
            const fetchFavMovies = async () =>{
                try{
                    const requests = favMovies.map((id)=>
                        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=a7c71da888fc8a010a3a0a91aa1c8c4a`)
                    )
                    const responses = await Promise.all(requests);
                        
                    const MoviesData = responses.map((data)=>{
                        const { title, vote_average, overview, release_date,
                        poster_path } = data.data;
                        return { title, vote_average, overview, release_date,
                        poster_path };
                    })
                    setMovies(MoviesData);
                }catch(e){
                    console.log(e);
                }
            }

            fetchFavMovies();
        }
    ,[favMovies]);



    return (
          <div className="flex gap-9 flex-wrap justify-center mt-12 px-4">
            {Movies.map((movie, key) => (
                <div key={key} className="max-w-xl bg-white rounded-xl shadow-md p-6 mb-6">
                    {/* Poster */}
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full rounded-lg mb-4 object-cover"
                    />
                    <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
                    <p className="text-gray-700 mb-2"><strong>Release Date:</strong> {movie.release_date}</p>
                    <p className="text-gray-700 mb-2"><strong>Rating:</strong> {movie.vote_average}</p>
                    <p className="text-gray-700"><strong>Overview:</strong> {movie.overview}</p>
                </div>
            ))}
        </div>
    )
}

export default Fav;