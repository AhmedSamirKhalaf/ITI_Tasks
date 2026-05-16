import { useEffect, useState } from "react";
import Card from "../../components/card";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useDispatch, useSelector } from "react-redux";
import { FetchMovies, MoviesStatus, selectAllMovies, TopRatedMovies } from "./components/movieSlice";
import { uselanguage } from "../../context/languageContext";

function Home({ search }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [topRatedMovies,settopRatedMovies] = useState(false);
    
    const mytheme = useSelector((state) => state.RthemeReducer.theme);
    const Allmovies = useSelector(selectAllMovies);
    const topRatedMoviesList = useSelector(TopRatedMovies);
    const status = useSelector(MoviesStatus);
    const { language } = uselanguage();
    const dispatch = useDispatch();

    const movies = topRatedMovies ? topRatedMoviesList : Allmovies;

    const translations = {
        en: {
            title: "Movie's List",
            loading: "loading",
            prev: "Prev",
            next: "Next",
            page: "Page"
        },
        ar: {
            title: "قائمة الأفلام",
            loading: "جاري التحميل",
            prev: "السابق",
            next: "التالي",
            page: "صفحة"
        }
    };

    const t = translations[language] || translations.en;

    useEffect(() => {
        setCurrentPage(1);
    }, [search.query]);

    useEffect(() => {
        dispatch(FetchMovies({ query: search.query, page: currentPage, language }));
    }, [search.query, currentPage, language, dispatch]);

    
    const handlePagination = (e) => {
        const direction = e.target.name;
        setCurrentPage(prev => 
            direction === 'increase' ? prev + 1 : Math.max(1, prev - 1)
        );
    };

    const handleTopRatedMovies = () => {
        settopRatedMovies(prev => !prev)
    };

    return (
    <div className={`flex flex-col pt-4
        ${mytheme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}
    `} dir={language === 'ar' ? 'rtl' : 'ltr'}>

        {/* Header section */}
        <div className="flex flex-col items-center justify-between px-6 pb-4">
            <div className="flex items-center gap-3">
                <AcUnitIcon />
                <h1 className="text-6xl font-semibold">{t.title}</h1>
                <AcUnitIcon />
            </div>

          
        </div>

        <hr className="border-t border-black mx-6" />
          {/* Top Rated button — right side */}
            <div className="flex mt-2 ml-7">
            <button
                onClick={handleTopRatedMovies}
                className={`
                     gap-2 px-5 py-1.5 rounded-full text-sm font-medium
                    transition-all duration-300 border
                    ${topRatedMovies 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105' 
                        : 'bg-transparent border-gray-500 text-gray-400 hover:border-gray-300 hover:text-gray-200'
                    }
                `}
            >
                <span className={`transition-transform duration-300 ${topRatedMovies ? 'rotate-12' : ''}`}>
                    ⭐
                </span>
                {topRatedMovies ? 'All Movies' : 'Top Rated Movies'}
            </button>
            </div>

        {/* Cards section */}
        <div className="flex gap-9 flex-wrap justify-center pt-4 px-6">
            {status === 'pending' ? (
                <h1 className="text-3xl font-bold w-full text-center">{t.loading}</h1>
            ) : (
                movies.map(movie => (
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
            )}
        </div>

        {/* Pagination */}
        <hr className="w-full mt-4" />
        {!topRatedMovies && (
            <div className="flex gap-3 pb-6 justify-center pt-4">
                <button 
                    className="btn bg-slate-600 p-5" 
                    name="decrease" 
                    onClick={handlePagination}
                    disabled={currentPage === 1}
                >{t.prev}</button>

                <span className="flex items-center px-4">{t.page} {currentPage}</span>

                <button 
                    className="btn bg-blue-600 p-5" 
                    name="increase" 
                    onClick={handlePagination}
                >{t.next}</button>
            </div>
        )}
    </div>
);
}

export default Home;