import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/card"; 
import StarIcon from '@mui/icons-material/Star';

function Movie({ match }) {       
    const id = match.params.id;   
    
    const [movie, setMovie] = useState({
        title: '',
        vote_average: 0,
        overview: '', 
        release_date: '', 
        poster_path: ''
    });

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=a7c71da888fc8a010a3a0a91aa1c8c4a`)
        .then((res) => {
            const { title, vote_average, overview, release_date, poster_path } = res.data;
            setMovie({ title, vote_average, overview, release_date, poster_path });
        }).catch((err) => {
            console.error("Error fetching movie:", err);
        });
    }, [id]);
    
    return (
        <div className="flex gap-9 flex-wrap justify-center mt-12 px-4">
            <Card 
                title={movie.title} 
                rating={movie.vote_average} 
                date={movie.release_date} 
                image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ""}
            />
            <div className="max-w-xl">
                <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
                <p className="text-gray-700 mb-2"><strong>Release Date:</strong> {movie.release_date}</p>
                <p className="text-gray-700 mb-2"><strong>Rating:</strong> {movie.vote_average} <StarIcon className="text-yellow-400" /></p>
                <p className="text-gray-700"><strong>Overview:</strong> {movie.overview}</p>
            </div>  
        </div>
    );
}

export default Movie;