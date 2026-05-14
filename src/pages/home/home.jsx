import { useEffect, useState } from "react";
import Card from "../../components/card";
import axios from "axios";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useSelector } from "react-redux";

const API_KEY = 'a7c71da888fc8a010a3a0a91aa1c8c4a';
const searchURL = `https://api.themoviedb.org/3/search/movie`;
const discoverURL = `https://api.themoviedb.org/3/discover/movie`;

function Home({ search }) {
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const mytheme = useSelector((state) => state.RthemeReducer.theme);

    useEffect(() => {
        setCurrentPage(1);
    }, [search.query]);

    useEffect(() => {
        const params = search.query
            ? { api_key: API_KEY, page: currentPage, query: search.query }
            : { api_key: API_KEY, page: currentPage, certification_country: 'US', 'certification.lte': 'PG-13' };

        axios.get(search.query ? searchURL : discoverURL, { params })
            .then(res => setList(res.data.results))
            .catch(err => console.log(err))
            

    }, [search.query, currentPage]);

    
    const handlePagination = (e) => {
        const direction = e.target.name;
        setCurrentPage(prev => 
            direction === 'increase' ? prev + 1 : Math.max(1, prev - 1)
        );
    };

    return (
        <div className={`flex gap-9 flex-wrap justify-center pt-4
            ${mytheme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}
        `}>
            <AcUnitIcon />
            <h1 className="text-5xl font-semibold">Movie's List</h1>
            <AcUnitIcon />
            <hr className="w-full border-t border-black" />

            {list.map(movie => (
                        <Card
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            rating={movie.vote_average}
                            overview={movie.overview}
                            date={movie.release_date}
                            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        />
                    ))
            }

            <hr className="w-full" />
            <div className="flex gap-3 pb-6">
                <button 
                    className="btn bg-slate-600 p-5" 
                    name="decrease" 
                    onClick={handlePagination}
                    disabled={currentPage === 1}
                >Prev</button>

                <span className="flex items-center px-4">Page {currentPage}</span>

                <button 
                    className="btn bg-blue-600 p-5" 
                    name="increase" 
                    onClick={handlePagination}
                >Next</button>
            </div>
        </div>
    );
}

export default Home;