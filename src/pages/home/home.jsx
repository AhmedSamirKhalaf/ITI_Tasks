import { useEffect, useState } from "react";
import Card from "../../components/card";
import axios from "axios";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useSelector } from "react-redux";

function Home({ search, setSearch }) {
    const [list, setList] = useState([]);
    const [page, setPage] = useState({ currentPage: 1 });
    const [itemsPerPage , setItemsPerPage] = useState(15);
    

   
    useEffect(() => {
        setPage({ currentPage: 1 });
    }, [search.query]);

    
    useEffect(() => {
        const url = search.query
            ? `https://api.themoviedb.org/3/search/movie?api_key=a7c71da888fc8a010a3a0a91aa1c8c4a&query=${search.query}&page=${page.currentPage}`
            : `https://api.themoviedb.org/3/movie/popular?api_key=a7c71da888fc8a010a3a0a91aa1c8c4a&page=${page.currentPage}`;

        axios.get(url)
            .then((data) => {
                setList(data.data.results);
                console.log(data.data.results);
            })
            .catch((err) => console.log(err));
    }, [search, page.currentPage]);

    const handlePageination = (e) => {
        if (e.target.name === 'increase') {
            setPage({ ...page, currentPage: page.currentPage + 1 });
        } else {
            if (page.currentPage !== 1) {   
                setPage({ ...page, currentPage: page.currentPage - 1 });
            }
        }
    };

    const mytheme = useSelector((state)=>state.RthemeReducer.theme)
    return (
        <>
            <div className={`flex gap-9 flex-wrap justify-center 
                pt-4
                ${mytheme === 'light' ? 'text-black' : 'text-white'}
                ${mytheme === 'light' ? 'bg-white' : 'bg-gray-800'}
            `}>
                <AcUnitIcon />
                <h1 className="text-5xl font-semibold text-left">Movie's List</h1>
                <AcUnitIcon />
                <hr className="w-full border-t border-black" />

                {list.map((movie) => (
                    <Card
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        rating={movie.vote_average}
                        overview={movie.overview}
                        date={movie.release_date}
                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    />
                ))}

                <hr className="w-full" />
                <div className="flex gap-3">
                    <button className="btn bg-slate-600 p-5" name="decrease" onClick={handlePageination}>Prev</button>
                    <button className="btn bg-blue-600 p-5" name="increase" onClick={handlePageination}>Next</button>
                </div>
            </div>
        </>
    );
}

export default Home;